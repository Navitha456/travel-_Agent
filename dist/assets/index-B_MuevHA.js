(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`WF-218`,airline:`Wayfinder Air`,code:`WF`,depart:`08:40`,arrive:`12:10`,duration:`3h 30m`,stops:`Nonstop`,price:248,tone:`coral`},{id:`SK-904`,airline:`Skyline`,code:`SK`,depart:`10:15`,arrive:`14:05`,duration:`3h 50m`,stops:`Nonstop`,price:289,tone:`blue`},{id:`NC-441`,airline:`North Coast`,code:`NC`,depart:`14:20`,arrive:`19:10`,duration:`4h 50m`,stops:`1 stop`,price:196,tone:`green`}],t={origin:``,destination:``,date:``,results:[],selected:null,booked:!1,profile:{tier:`Standard`,airline:`Flexible`}},n=document.querySelector(`#app`),r=new Date().toISOString().split(`T`)[0];function i(){n.innerHTML=`
    <main class="shell">
      <nav class="nav">
        <a class="brand" href="#"><span class="brand-mark">✦</span><span>wayfinder</span></a>
        <div class="nav-status"><span class="status-dot"></span> Agent online <span class="nav-divider"></span> ${t.profile.tier} traveler</div>
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
              <label class="field"><span>Leaving from</span><div class="input-wrap"><span class="field-icon">↗</span><input id="origin" required placeholder="City or airport" value="${t.origin}" /></div></label>
              <button type="button" class="swap" id="swap" title="Swap origin and destination">⇄</button>
              <label class="field"><span>Going to</span><div class="input-wrap"><span class="field-icon">↘</span><input id="destination" required placeholder="City or airport" value="${t.destination}" /></div></label>
              <label class="field date-field"><span>Departure</span><div class="input-wrap"><span class="field-icon">◷</span><input id="date" required type="date" min="${r}" value="${t.date}" /></div></label>
            </div>
            <div class="form-footer"><div class="preference"><span>Profile memory</span><strong>${t.profile.tier} budget</strong><span class="slash">/</span><strong>${t.profile.airline}</strong></div><button class="primary-btn" type="submit">Find my flight <span>→</span></button></div>
          </form>
        </div>

        <aside class="memory-panel">
          <div class="memory-heading"><span class="section-number">02</span><h2>In memory</h2></div>
          <p>Your preferences make each search feel a little more like yours.</p>
          <div class="memory-row"><span>Budget tier</span><strong>${t.profile.tier}</strong></div>
          <div class="memory-row"><span>Airline preference</span><strong>${t.profile.airline}</strong></div>
          <button class="text-btn" id="edit-memory">Edit profile <span>↗</span></button>
        </aside>
      </section>

      ${t.results.length?o():a()}
      ${t.booked?l():``}
      <footer><span>WAYFINDER / TRAVEL AGENTIC</span><span>Search is simulated for this prototype</span></footer>
    </main>
    ${t.selected&&!t.booked?c():``}
  `,u()}function a(){return`<section class="journey-empty"><div class="route-line"><span></span><i></i><span></span></div><p>Your next chapter is waiting</p><small>Search above to see carefully chosen options.</small></section>`}function o(){return`<section class="results" id="results"><div class="results-heading"><div><span class="section-number">03</span><h2>Good options, ${t.origin} → ${t.destination}</h2></div><span class="result-count">${t.results.length} matches found</span></div><div class="flight-list">${t.results.map(s).join(``)}</div><div class="observe-note"><span class="pulse"></span><strong>OBSERVE</strong><span>Compared for price, travel time, and your Standard budget profile.</span></div></section>`}function s(e){return`<article class="flight-card"><div class="airline"><span class="airline-logo ${e.tone}">${e.code}</span><span>${e.airline}</span></div><div class="flight-time"><strong>${e.depart}</strong><span>${t.origin.slice(0,3).toUpperCase()||`---`}</span></div><div class="flight-path"><span></span><small>${e.duration} · ${e.stops}</small><span></span></div><div class="flight-time"><strong>${e.arrive}</strong><span>${t.destination.slice(0,3).toUpperCase()||`---`}</span></div><div class="fare"><small>from</small><strong>$${e.price}</strong><button class="choose-btn" data-flight="${e.id}">Choose <span>→</span></button></div></article>`}function c(){let e=t.selected;return`<div class="modal-backdrop"><section class="auth-modal" role="dialog" aria-modal="true"><button class="close-modal" id="cancel-booking" aria-label="Close">×</button><span class="modal-kicker">Human-in-the-loop intercept</span><h2>One last look<br /><em>before takeoff.</em></h2><p>Wayfinder found a match. Nothing has been charged and no ticket has been issued.</p><div class="modal-flight"><span class="airline-logo ${e.tone}">${e.code}</span><div><strong>${t.origin} → ${t.destination}</strong><small>${e.airline} · ${e.depart}–${e.arrive} · ${e.duration}</small></div><strong class="modal-price">$${e.price}</strong></div><div class="safety-check">⚠️ <span><strong>CRITICAL SAFETY CHECK</strong><br />Requesting human authorization to purchase flight ${e.id}...</span></div><div class="modal-actions"><button class="secondary-btn" id="cancel-booking-2">Keep looking</button><button class="primary-btn" id="authorize-booking">Authorize purchase <span>→</span></button></div></section></div>`}function l(){let e=t.selected;return`<section class="success-panel"><span class="success-icon">✓</span><div><span class="modal-kicker">Booking confirmed · ${e.id}</span><h2>You are going places.</h2><p>Your ${e.airline} flight from ${t.origin} to ${t.destination} is secured. A confirmation would be sent to your inbox in a live environment.</p></div><button class="secondary-btn" id="new-search">Plan another trip</button></section>`}function u(){document.querySelector(`#search-form`).addEventListener(`submit`,n=>{n.preventDefault(),t.origin=document.querySelector(`#origin`).value.trim(),t.destination=document.querySelector(`#destination`).value.trim(),t.date=document.querySelector(`#date`).value,t.results=e,t.selected=null,t.booked=!1,i(),document.querySelector(`#results`)?.scrollIntoView({behavior:`smooth`,block:`start`})}),document.querySelector(`#swap`).addEventListener(`click`,()=>{let e=document.querySelector(`#origin`),t=document.querySelector(`#destination`);[e.value,t.value]=[t.value,e.value]}),document.querySelectorAll(`.choose-btn`).forEach(e=>e.addEventListener(`click`,()=>{t.selected=t.results.find(t=>t.id===e.dataset.flight),i()})),document.querySelectorAll(`#cancel-booking, #cancel-booking-2`).forEach(e=>e?.addEventListener(`click`,()=>{t.selected=null,i()})),document.querySelector(`#authorize-booking`)?.addEventListener(`click`,()=>{t.booked=!0,i(),window.scrollTo({top:document.body.scrollHeight,behavior:`smooth`})}),document.querySelector(`#new-search`)?.addEventListener(`click`,()=>{t.booked=!1,t.results=[],t.selected=null,i(),window.scrollTo({top:0,behavior:`smooth`})}),document.querySelector(`#edit-memory`)?.addEventListener(`click`,()=>{t.profile.tier=t.profile.tier===`Standard`?`Comfort`:`Standard`,i()})}i();