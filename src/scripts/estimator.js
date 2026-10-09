import {
  cargoNotes,
  cargoTypeNames,
  originNames,
  transitTimes,
} from '../data/estimator.js';
import { renderIconSvg } from './icons.js';

const stages = [
  { name: 'Operaciones en puerto origen', icon: 'lucide:building', key: 'po', detail: 'Recepción, inspección, documentación, stowage.' },
  { name: 'Navegación marítima', icon: 'lucide:ship', key: 'nav', detail: 'Travesía por el Pacífico Sur. Monitoreo 24/7.' },
  { name: 'Operaciones en puerto destino', icon: 'lucide:anchor', key: 'pd', detail: 'Descarga, traslado a patio, verificación.' },
  { name: 'Despacho aduanero', icon: 'lucide:file-check', key: 'cu', detail: 'Revisión documental, inspección, liberación.' },
  { name: 'Última milla / Entrega final', icon: 'lucide:truck', key: 'lm', detail: 'Distribución desde bodega Hanga Roa.' },
];

export function initEstimator() {
  const button = document.getElementById('estBtn');
  const origin = document.getElementById('estOrigin');
  const type = document.getElementById('estType');
  const results = document.getElementById('estResults');
  if (!button || !origin || !type || !results) return;

  button.addEventListener('click', () => {
    const timing = transitTimes[origin.value];
    const cargoType = cargoTypeNames[type.value];
    const note = cargoNotes[type.value];
    if (!timing || !cargoType || !note) return;

    const stageCards = stages.map((stage, index) => `
      <div class="estimator-stage rounded-xl p-5 border border-white/[0.06] flex items-start gap-4" style="background:rgba(255,255,255,0.02)">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(34,211,238,0.08)">
          <span class="text-lg font-bold text-cyan-400">${index + 1}</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-semibold text-white">${stage.name}</span>
            <span class="text-sm font-bold text-cyan-400">${timing[stage.key]}</span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">${stage.detail}</p>
        </div>
      </div>`).join('');

    results.innerHTML = `
      <div class="tracker-result">
        <div class="rounded-2xl p-6 md:p-8 border border-cyan-500/20 mb-6" style="background:rgba(34,211,238,0.03)">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="text-xs text-slate-500 mb-1">Tiempo total estimado — ${originNames[origin.value]} → Hanga Roa</div>
              <div class="text-3xl md:text-4xl font-extrabold text-white">${timing.tot}</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-slate-500 mb-1">Tipo de carga</div>
              <div class="text-sm font-semibold text-cyan-400">${cargoType}</div>
            </div>
          </div>
        </div>
        <div class="space-y-3 mb-6">${stageCards}</div>
        <div class="rounded-xl p-4 border border-white/[0.06] flex items-start gap-3" style="background:rgba(255,255,255,0.02)">
          ${renderIconSvg('info', { width: 16, height: 16, class: 'text-amber-400 flex-shrink-0 mt-0.5' })}
          <div><div class="text-xs font-semibold text-amber-300 mb-1">Nota para ${cargoType}</div><p class="text-xs text-slate-400 leading-relaxed">${note}</p></div>
        </div>
        <div class="rounded-xl p-4 border border-white/[0.06] mt-3 flex items-start gap-3" style="background:rgba(255,255,255,0.02)">
          ${renderIconSvg('mail', { width: 16, height: 16, class: 'text-cyan-400 flex-shrink-0 mt-0.5' })}
          <p class="text-xs text-slate-500 leading-relaxed"><strong class="text-slate-400">Los precios se envían solo por correo electrónico.</strong> Completá el formulario para recibir una propuesta en menos de 2 horas.</p>
        </div>
      </div>`;
  });
}
