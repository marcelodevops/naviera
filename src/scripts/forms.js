import { createQuote, isApiConfigured } from '../services/api.js';

function setStatus(form, message, isError = false) {
  let status = form.querySelector('[data-form-status]');
  if (!status) {
    status = document.createElement('p');
    status.dataset.formStatus = '';
    status.setAttribute('aria-live', 'polite');
    form.append(status);
  }
  status.className = isError
    ? 'text-sm text-red-400'
    : 'text-sm text-teal-400';
  status.textContent = message;
}

function openEmailRequest(data) {
  const lines = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  const subject = encodeURIComponent('Solicitud de cotización — TAINA');
  const body = encodeURIComponent(`${lines}\n\n— Enviado desde taina.cl`);
  window.location.href = `mailto:cargo@taina.cl?subject=${subject}&body=${body}`;
}

export function initQuoteForms() {
  const forms = [
    document.getElementById('quickQuoteForm'),
    document.getElementById('quoteForm'),
  ].filter(Boolean);

  forms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const data = Object.fromEntries(new FormData(form));

      if (!isApiConfigured) {
        openEmailRequest(data);
        setStatus(form, 'Se abrió tu cliente de correo. Revisa y envía el mensaje para completar la solicitud.');
        return;
      }

      button.disabled = true;
      try {
        await createQuote(data);
        setStatus(form, 'Solicitud recibida. El equipo de TAINA se pondrá en contacto contigo.');
        form.reset();
      } catch (error) {
        setStatus(form, error.message, true);
      } finally {
        button.disabled = false;
      }
    });
  });
}
