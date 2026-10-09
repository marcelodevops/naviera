export function initDepartureCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;

  function nextDeparture() {
    const now = new Date();
    const departure = new Date(now);
    departure.setDate(departure.getDate() + ((2 - departure.getDay() + 7) % 7));
    departure.setHours(6, 0, 0, 0);
    if (departure <= now) departure.setDate(departure.getDate() + 7);
    return departure;
  }

  function updateCountdown() {
    const hours = Math.max(0, Math.floor((nextDeparture() - new Date()) / 36e5));
    const days = Math.floor(hours / 24);
    countdown.textContent = days > 0 ? `${days}d ${hours % 24}h` : `${hours}h`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}
