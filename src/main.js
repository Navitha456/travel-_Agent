import './style.css';

const flights = [
  { id: 'WF-218', airline: 'Wayfinder Air', code: 'WF', depart: '08:40', arrive: '12:10', duration: '3h 30m', stops: 'Nonstop', price: 248, tone: 'coral' },
  { id: 'SK-904', airline: 'Skyline', code: 'SK', depart: '10:15', arrive: '14:05', duration: '3h 50m', stops: 'Nonstop', price: 289, tone: 'blue' },
  { id: 'NC-441', airline: 'North Coast', code: 'NC', depart: '14:20', arrive: '19:10', duration: '4h 50m', stops: '1 stop', price: 196, tone: 'green' }
];

const state = {
  origin: '',
  destination: '',
  date: '',
  results: [],
  selected: null,
  booked: false,
  profile: { tier: 'Standard', airline: 'Flexible' }
};

const app = document.querySelector('#app');
const today = new Date().toISOString().split('T')[0];

function render() {
  app.innerHTML = `
    <main class="shell">
      <nav class="nav">
        <a class="brand" href="#"><span class="brand-mark">✦</span><span>wayfinder</span></a>
        <div class="nav-status"><span class="status-dot"></span> Agent online <span class="nav-divider"></span> ${state.profile.tier} traveler</div>
      </nav>

      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Autonomous travel desk <span>•</span> 01</p>
          <h1>Go somewhere<br /><em>worth remembering.</em></h1>
          <p class="hero-lede">Tell us where you want to be. Wayfinder will search, compare, and wait for your approval before anything is purchased.</p>
        </div>
        <div class="hero-stamp" aria-label="Wayfinder guarantee"><span>YOUR<br />TRIP,<br /><strong>YOUR<br />CALL.</strong></span></div>
      </section>

      <section class="workspace">
        <div class="search-panel panel">
          <div class="panel-top"><div><span class="section-number">01</span><h2>Set the direction</h2></div><span class="tiny-label">Search flights</span></div>
          <form id="search-form">
            <div class="field-grid">
              <label class="field"><span>Leaving from</span><div class="input-wrap"><span class="field-icon">↗</span><input id="origin" required placeholder="City or airport" value="${state.origin}" /></div></label>
              <button type="button" class="swap" id="swap" title="Swap origin and destination">⇄</button>
              <label class="field"><span>Going to</span><div class="input-wrap"><span class="field-icon">↘</span><input id="destination" required placeholder="City or airport" value="${state.destination}" /></div></label>
              <label class="field date-field"><span>Departure</span><div class="input-wrap"><span class="field-icon">◷</span><input id="date" required type="date" min="${today}" value="${state.date}" /></div></label>
            </div>
            <div class="form-footer"><div class="preference"><span>Profile memory</span><strong>${state.profile.tier} budget</strong><span class="slash">/</span><strong>${state.profile.airline}</strong></div><button class="primary-btn" type="submit">Find my flight <span>→</span></button></div>
          </form>
        </div>

        <aside class="memory-panel">
          <div class="memory-heading"><span class="section-number">02</span><h2>In memory</h2></div>
          <p>Your preferences make each search feel a little more like yours.</p>
          <div class="memory-row"><span>Budget tier</span><strong>${state.profile.tier}</strong></div>
          <div class="memory-row"><span>Airline preference</span><strong>${state.profile.airline}</strong></div>
          <button class="text-btn" id="edit-memory">Edit profile <span>↗</span></button>
        </aside>
      </section>

      ${state.results.length ? resultsView() : emptyState()}
      ${state.booked ? bookedView() : ''}
      <footer><span>WAYFINDER / TRAVEL AGENTIC</span><span>Search is simulated for this prototype</span></footer>
    </main>
    ${state.selected && !state.booked ? authorizationModal() : ''}
  `;
  bindEvents();
}

function emptyState() {
  return `<section class="journey-empty"><div class="route-line"><span></span><i></i><span></span></div><p>Your next chapter is waiting</p><small>Search above to see carefully chosen options.</small></section>`;
}

function resultsView() {
  return `<section class="results" id="results"><div class="results-heading"><div><span class="section-number">03</span><h2>Good options, ${state.origin} → ${state.destination}</h2></div><span class="result-count">${state.results.length} matches found</span></div><div class="flight-list">${state.results.map(flightCard).join('')}</div><div class="observe-note"><span class="pulse"></span><strong>OBSERVE</strong><span>Compared for price, travel time, and your Standard budget profile.</span></div></section>`;
}

function flightCard(flight) {
  return `<article class="flight-card"><div class="airline"><span class="airline-logo ${flight.tone}">${flight.code}</span><span>${flight.airline}</span></div><div class="flight-time"><strong>${flight.depart}</strong><span>${state.origin.slice(0, 3).toUpperCase() || '---'}</span></div><div class="flight-path"><span></span><small>${flight.duration} · ${flight.stops}</small><span></span></div><div class="flight-time"><strong>${flight.arrive}</strong><span>${state.destination.slice(0, 3).toUpperCase() || '---'}</span></div><div class="fare"><small>from</small><strong>$${flight.price}</strong><button class="choose-btn" data-flight="${flight.id}">Choose <span>→</span></button></div></article>`;
}

function authorizationModal() {
  const flight = state.selected;
  return `<div class="modal-backdrop"><section class="auth-modal" role="dialog" aria-modal="true"><button class="close-modal" id="cancel-booking" aria-label="Close">×</button><span class="modal-kicker">Human-in-the-loop intercept</span><h2>One last look<br /><em>before takeoff.</em></h2><p>Wayfinder found a match. Nothing has been charged and no ticket has been issued.</p><div class="modal-flight"><span class="airline-logo ${flight.tone}">${flight.code}</span><div><strong>${state.origin} → ${state.destination}</strong><small>${flight.airline} · ${flight.depart}–${flight.arrive} · ${flight.duration}</small></div><strong class="modal-price">$${flight.price}</strong></div><div class="safety-check">⚠️ <span><strong>CRITICAL SAFETY CHECK</strong><br />Requesting human authorization to purchase flight ${flight.id}...</span></div><div class="modal-actions"><button class="secondary-btn" id="cancel-booking-2">Keep looking</button><button class="primary-btn" id="authorize-booking">Authorize purchase <span>→</span></button></div></section></div>`;
}

function bookedView() {
  const flight = state.selected;
  return `<section class="success-panel"><span class="success-icon">✓</span><div><span class="modal-kicker">Booking confirmed · ${flight.id}</span><h2>You are going places.</h2><p>Your ${flight.airline} flight from ${state.origin} to ${state.destination} is secured. A confirmation would be sent to your inbox in a live environment.</p></div><button class="secondary-btn" id="new-search">Plan another trip</button></section>`;
}

function bindEvents() {
  document.querySelector('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    state.origin = document.querySelector('#origin').value.trim();
    state.destination = document.querySelector('#destination').value.trim();
    state.date = document.querySelector('#date').value;
    state.results = flights;
    state.selected = null;
    state.booked = false;
    render();
    document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  document.querySelector('#swap').addEventListener('click', () => {
    const origin = document.querySelector('#origin');
    const destination = document.querySelector('#destination');
    [origin.value, destination.value] = [destination.value, origin.value];
  });
  document.querySelectorAll('.choose-btn').forEach((button) => button.addEventListener('click', () => {
    state.selected = state.results.find((flight) => flight.id === button.dataset.flight);
    render();
  }));
  document.querySelectorAll('#cancel-booking, #cancel-booking-2').forEach((button) => button?.addEventListener('click', () => { state.selected = null; render(); }));
  document.querySelector('#authorize-booking')?.addEventListener('click', () => { state.booked = true; render(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); });
  document.querySelector('#new-search')?.addEventListener('click', () => { state.booked = false; state.results = []; state.selected = null; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.querySelector('#edit-memory')?.addEventListener('click', () => { state.profile.tier = state.profile.tier === 'Standard' ? 'Comfort' : 'Standard'; render(); });
}

render();
