const apiBaseUrl = (import.meta.env.PUBLIC_API_URL ?? '').replace(/\/+$/, '');

export const isApiConfigured = apiBaseUrl.length > 0;

export async function getShipment(trackingCode) {
  const response = await fetch(
    `${apiBaseUrl}/api/shipments/${encodeURIComponent(trackingCode)}`,
  );

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('No se pudo consultar el seguimiento.');

  return response.json();
}

export async function createQuote(quote) {
  const response = await fetch(`${apiBaseUrl}/api/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quote),
  });

  if (!response.ok) throw new Error('No se pudo enviar la solicitud de cotización.');
}
