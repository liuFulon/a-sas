const modal = document.getElementById('modal')
const modalClose = document.getElementById('modal-close')
modalClose.addEventListener('click',()=>modal.classList.add('hidden'))
async function loadLists(){
  const up = document.getElementById('upcoming-list')
  const past = document.getElementById('past-list')
  const resp1 = await fetch('/api/events/upcoming')
  const upcoming = await resp1.json()
  const resp2 = await fetch('/api/events/past')
  const pastEvents = await resp2.json()
  up.innerHTML = upcoming.map(e => `<div class="card"><img src="${e.image_url||'assets/images/placeholder.jpg'}"><h4>${e.name}</h4><p class="meta">${e.start_date} • ${e.location}</p><a class="btn" href="event.html?id=${e.id}">View</a></div>`).join('')
  past.innerHTML = pastEvents.map(e => `<div class="card"><img src="${e.image_url||'assets/images/placeholder.jpg'}"><h4>${e.name}</h4><p class="meta">${e.start_date} • ${e.location}</p><a class="btn" href="event.html?id=${e.id}">View</a></div>`).join('')
}
loadLists()
