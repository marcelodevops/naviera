import { demoShipments } from '../data/demo/shipments.js';
import { getShipment, isApiConfigured } from '../services/api.js';
import { renderIconSvg } from './icons.js';

const statusStyles = {
  completado: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
  },
  activo: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    text: 'text-cyan-300',
  },
  pendiente: {
    bg: 'bg-white/[0.02]',
    border: 'border-white/[0.06]',
    text: 'text-slate-600',
  },
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function renderNotFound(trackingCode) {
  return `<div class="tracker-result rounded-2xl p-8 border border-white/10 text-center" style="background:rgba(255,255,255,0.02)">
    <div class="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style="background:rgba(239,68,68,0.1)">
      ${renderIconSvg('x-circle', { width: 32, height: 32, class: 'text-red-400' })}
    </div>
    <h3 class="text-lg font-bold text-white mb-2">BL no encontrado</h3>
    <p class="text-sm text-slate-400 mb-6">El número <strong class="text-white">${escapeHtml(trackingCode)}</strong> no corresponde a un envío activo.</p>
    <a href="#contacto" class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">Contactar soporte ${renderIconSvg('arrow-right', { width: 14, height: 14 })}</a>
  </div>`;
}

function renderShipment(shipment) {
  if (!shipment || !Array.isArray(shipment.stages) || shipment.stages.length === 0) {
    throw new Error('La respuesta de seguimiento no tiene un formato válido.');
  }

  const currentStage = Math.max(
    0,
    Math.min(Number(shipment.currentStage) || 0, shipment.stages.length - 1),
  );
  const progress = Math.round((currentStage / (shipment.stages.length - 1)) * 100);
  const label = currentStage === shipment.stages.length - 1
    ? 'Entregado'
    : escapeHtml(shipment.stages[currentStage].name);

  const stages = shipment.stages.map((stage, index) => {
    const style = statusStyles[stage.status] ?? statusStyles.pendiente;
    const isLast = index === shipment.stages.length - 1;
    const isActive = stage.status === 'activo';
    const lineClass = index < currentStage ? 'bg-cyan-500/40' : 'bg-white/5';
    return `<div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="stage-node w-10 h-10 rounded-full flex items-center justify-center border ${style.border} ${style.bg} ${isActive ? 'stage-active-node' : ''} flex-shrink-0">
          ${renderIconSvg(stage.icon, { width: 18, height: 18, class: style.text })}
        </div>
        ${!isLast ? `<div class="stage-line w-0.5 h-16 ${lineClass}"></div>` : ''}
      </div>
      <div class="pb-8">
        <div class="flex items-center gap-2 mb-0.5">
          <span class="text-sm font-semibold ${style.text}">${escapeHtml(stage.name)}</span>
          ${isActive ? '<span class="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full">En curso</span>' : ''}
          ${stage.status === 'completado' ? renderIconSvg('check', { width: 14, height: 14, class: 'text-cyan-400' }) : ''}
        </div>
        <div class="text-xs text-slate-500 mb-1">${escapeHtml(stage.location)}</div>
        <div class="text-xs ${stage.date === '—' ? 'text-slate-700' : 'text-slate-400'}">${escapeHtml(stage.date)}</div>
        <p class="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-md">${escapeHtml(stage.detail)}</p>
      </div>
    </div>`;
  }).join('');

  return `<div class="tracker-result">
    <div class="rounded-2xl p-6 md:p-8 border border-white/10 mb-6" style="background:rgba(255,255,255,0.02)">
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg">${escapeHtml(shipment.bl)}</span>
            <span class="text-xs font-semibold ${currentStage === shipment.stages.length - 1 ? 'text-teal-400' : 'text-cyan-400'}">${label}</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-1">${escapeHtml(shipment.contenido)}</h3>
          <p class="text-sm text-slate-400">${escapeHtml(shipment.tipo)}</p>
        </div>
        <div class="flex-shrink-0 text-right">
          <div class="text-xs text-slate-500 mb-1">Progreso</div>
          <div class="text-2xl font-bold text-white">${progress}%</div>
        </div>
      </div>
      <div class="h-2 rounded-full overflow-hidden mb-4" style="background:rgba(255,255,255,0.05)">
        <div class="h-full rounded-full" style="width:${progress}%;background:linear-gradient(to right,#22d3ee,#0e7490)"></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div><span class="text-slate-600">Origen</span><div class="text-slate-300 font-medium mt-0.5">${escapeHtml(shipment.origen)}</div></div>
        <div><span class="text-slate-600">Destino</span><div class="text-slate-300 font-medium mt-0.5">${escapeHtml(shipment.destino)}</div></div>
        <div><span class="text-slate-600">Buque</span><div class="text-slate-300 font-medium mt-0.5">${escapeHtml(shipment.buque)}</div></div>
      </div>
    </div>
    <div class="rounded-2xl p-6 md:p-8 border border-white/10" style="background:rgba(255,255,255,0.02)">
      <h4 class="text-sm font-bold text-white mb-6 flex items-center gap-2">${renderIconSvg('git-branch', { width: 16, height: 16, class: 'text-cyan-400' })}Historial de etapas</h4>
      ${stages}
    </div>
    <p class="text-center text-xs text-slate-600 mt-4">Los precios se envían exclusivamente por correo. <a href="#contacto" class="text-cyan-400/60 hover:text-cyan-400">Solicitar cotización →</a></p>
  </div>`;
}

export function initTracking() {
  const input = document.getElementById('trackerInput');
  const button = document.getElementById('trackerBtn');
  const results = document.getElementById('trackerResults');
  const notice = document.getElementById('trackingModeNotice');
  const examples = document.getElementById('trackingDemoExamples');

  if (!input || !button || !results) return;

  if (notice && isApiConfigured) {
    notice.textContent = 'Las consultas se envían al servicio configurado.';
    notice.classList.remove('text-amber-400/70');
    notice.classList.add('text-teal-400/70');
  }
  if (examples) examples.hidden = isApiConfigured;

  async function track(trackingCode) {
    const code = trackingCode.trim();
    if (!code) return;

    results.className = 'max-w-4xl mx-auto';
    results.textContent = 'Consultando seguimiento…';
    try {
      const shipment = isApiConfigured
        ? await getShipment(code)
        : demoShipments[code.toUpperCase()] ?? null;
      results.innerHTML = shipment ? renderShipment(shipment) : renderNotFound(code);
    } catch (error) {
      results.textContent = error.message;
      results.className = 'max-w-4xl mx-auto text-center text-sm text-red-400';
    }
  }

  button.addEventListener('click', () => track(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      track(input.value);
    }
  });
  examples?.querySelectorAll('[data-demo-tracking]').forEach((example) => {
    example.addEventListener('click', () => {
      input.value = example.dataset.demoTracking;
      track(input.value);
    });
  });
}
