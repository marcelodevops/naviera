#!/usr/bin/env python3
"""Export the coordination record as a local, read-only HTML snapshot."""
import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path


def metadata(body):
    return dict(re.findall(r'^([A-Za-z][A-Za-z ]+):\s*(.+)$', body, re.M))


def state(value):
    value = value.lower().strip()
    for label, pattern in [('accepted', r'^accepted\b'), ('in progress', r'^in progress\b'), ('review', r'^(review|submitted)\b'), ('blocked', r'^blocked\b'), ('issued', r'^issued\b'), ('proposals', r'^propos(al|ed|als)\b')]:
        if re.search(pattern, value):
            return label
    return 'unknown'


def extract(repo):
    base = repo / 'coordination'
    status = (base / 'STATUS.md').read_text()
    messages = []
    for folder in ['inbox', 'outbox']:
        for path in sorted((base / folder).glob('*.md')):
            if path.name == 'README.md':
                continue
            body = path.read_text()
            fields = metadata(body)
            task_match = re.search(r'\bNAV-\d+\b', fields.get('Assignment', ''))
            # Resolve only from the coordinator's explicit disposition of this file.
            evidence = []
            for line in status.splitlines():
                if f'{folder}/{path.name}' not in line:
                    continue
                disposition = re.search(r'\):\s*([^.!?]+)', line)
                if not disposition:
                    continue
                clause = disposition.group(1)
                if re.match(r'(reviewed|accepted|resolved)\b', clause, re.I) and not re.search(r'\b(not|unresolved|pending)\b', clause, re.I):
                    evidence.append(line)
            messages.append(dict(path=str(path.relative_to(repo)), body=body, fields=fields,
                                 task=task_match.group() if task_match else None,
                                 disposition='resolved / reviewed' if evidence else 'pending', evidence='\n'.join(evidence), folder=folder))
    tasks = []
    for path in sorted((base / 'assignments').glob('*.md')):
        if path.name == 'README.md':
            continue
        body = path.read_text()
        fields = metadata(body)
        task_id = path.stem
        # STATUS is authoritative when its assignments table contains this task.
        row = next((line for line in status.splitlines() if line.startswith('|') and f'[{task_id}]' in line), None)
        raw_state = row.split('|')[3].strip() if row else fields.get('State', '')
        owner = fields.get('Assigned to', 'Unspecified')
        title = body.splitlines()[0].lstrip('# ').split(' — ', 1)[-1]
        tasks.append(dict(id=task_id, title=title, owner=owner, state=state(raw_state), raw_state=raw_state,
                          dependencies=fields.get('Dependencies', 'Unspecified'), body=body,
                          path=str(path.relative_to(repo)), messages=[m for m in messages if m['task'] == task_id]))
    return dict(tasks=tasks, messages=messages, status=status, snapshot=datetime.now(timezone.utc).isoformat(timespec='seconds'), repo=str(repo))


PAGE = '''<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Naviera · Eiren coordination</title>
<style>
:root{color-scheme:dark;font-family:system-ui,sans-serif;background:#081321;color:#e0edf4}*{box-sizing:border-box}body{margin:0}header,main{max-width:1500px;margin:auto;padding:24px}header{border-bottom:1px solid #254058}h1{font-size:30px;margin:8px 0}h2{font-size:21px}h3{font-size:15px}p{line-height:1.6}.eyebrow{color:#67d4dd;letter-spacing:.12em;font-size:12px} .muted,small{color:#adbdcc}button,input,select{font:inherit;border:1px solid #365570;background:#10263a;color:inherit;padding:10px;border-radius:8px}button{cursor:pointer}button:hover{border-color:#67d4dd}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #67d4dd;outline-offset:3px}.toolbar{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}input{flex:1;min-width:160px}.board{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.lane{background:#0d1e30;padding:12px;border-radius:12px;min-height:150px}.card{display:block;width:100%;text-align:left;margin:10px 0;overflow-wrap:anywhere}.card strong,.card small{display:block;margin:5px 0}.count{color:#67d4dd}.lower{display:grid;grid-template-columns:1fr 2fr;gap:20px;margin-top:24px}.panel{background:#0d1e30;border:1px solid #254058;border-radius:12px;padding:20px;min-width:0}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.65 ui-monospace,monospace}details{margin:12px 0}summary{cursor:pointer;padding:10px 0;color:#a8e7ed}.queue button{display:block;width:100%;text-align:left;margin:12px 0}#detail:focus{outline:none}@media(max-width:1000px){.board{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:650px){header,main{padding:16px}.board{grid-template-columns:repeat(2,minmax(0,1fr))}.lower{grid-template-columns:1fr}h1{font-size:26px}}@media(max-width:360px){.board{grid-template-columns:1fr}}
</style>
<header><div class="eyebrow">NAVIERA / EIREN</div><h1>Coordination, in view</h1><p class="muted">Local read-only snapshot · rebuild to refresh. No automatic dispatch or monitoring.</p><small id="stamp"></small></header>
<main><h2>Task lifecycle</h2><p class="muted">Assignment records only. Coordinator baseline assessments are not tasks.</p><div class="toolbar"><input id="search" aria-label="Search tasks" placeholder="Find a task or owner"><select id="filter" aria-label="Filter task state"><option value="all">All states</option></select></div><div class="board" id="board"></div><p id="empty" hidden>No matching tasks.</p><div class="lower"><section class="panel queue"><h2>Eiren review queue</h2><p id="queueSummary"></p><div id="queue"></div></section><section class="panel" id="detail" tabindex="-1"><h2>Select a task</h2><p>Read its assignment, dependencies and matched evidence here.</p></section></div><section class="panel" style="margin-top:24px"><h2>Coordinator record</h2><p class="muted">Current STATUS.md — baseline, decisions, evidence and limits.</p><details><summary>Read shared status</summary><pre id="status"></pre></details></section></main>
<script id="data" type="application/json">__DATA__</script>
<script>
const data=JSON.parse(document.getElementById('data').textContent),states=['proposals','issued','in progress','review','accepted','blocked','unknown'];
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n};
document.getElementById('stamp').textContent='Snapshot '+new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Santiago'}).format(new Date(data.snapshot))+' · America/Santiago · '+data.repo;
document.getElementById('status').textContent=data.status;
const filter=document.getElementById('filter');states.forEach(s=>{const o=el('option',s);o.value=s;filter.append(o)});
function message(m){const d=el('details');d.append(el('summary',m.path+' · '+(m.fields.Kind||'unspecified kind')+' · '+m.disposition),el('pre',m.body));if(m.evidence)d.append(el('p','Coordinator evidence'),el('pre',m.evidence));return d}
function select(t){const d=document.getElementById('detail');d.replaceChildren(el('h2',t.id+' · '+t.title),el('p',t.raw_state+' · '+t.owner),el('p','Dependencies: '+t.dependencies));const a=el('details');a.open=true;a.append(el('summary',t.path),el('pre',t.body));d.append(a);t.messages.forEach(m=>d.append(message(m)));d.focus()}
function render(){const b=document.getElementById('board');b.replaceChildren();let shown=0;const q=document.getElementById('search').value.toLowerCase();states.forEach(s=>{const ts=data.tasks.filter(t=>t.state===s&&(filter.value==='all'||filter.value===s)&&(t.id+' '+t.title+' '+t.owner).toLowerCase().includes(q));shown+=ts.length;const lane=el('section',undefined,'lane');lane.append(el('h3',s+' · '+ts.length));ts.forEach(t=>{const c=el('button',undefined,'card');c.append(el('strong',t.id),el('span',t.title),el('small',t.owner));c.onclick=()=>select(t);lane.append(c)});b.append(lane)});document.getElementById('empty').hidden=shown>0}
filter.onchange=render;document.getElementById('search').oninput=render;render();
const inbox=data.messages.filter(m=>m.folder==='inbox'),pending=inbox.filter(m=>m.disposition==='pending');document.getElementById('queueSummary').textContent=pending.length+' pending · '+(inbox.length-pending.length)+' resolved / reviewed. '+(data.tasks.some(t=>t.state==='proposals')?'':'No assignment proposals recorded.');inbox.forEach(m=>document.getElementById('queue').append(message(m)));
</script></html>'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    data = extract(args.repo.resolve())
    encoded = json.dumps(data, ensure_ascii=True).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(PAGE.replace('__DATA__', encoded), encoding='utf-8')
    print(f'Exported {len(data["tasks"])} assignments to {args.output}')


if __name__ == '__main__':
    main()
