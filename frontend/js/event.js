const modalE = document.getElementById('modal')
const modalCloseE = document.getElementById('modal-close')
if(modalCloseE) modalCloseE.addEventListener('click',()=>modalE.classList.add('hidden'))
async function loadEvent(){
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  if(!id){document.getElementById('event-detail').innerHTML='<p>Missing event id.</p>';return}
  const res = await fetch('/api/events/'+id)
  if(!res.ok){document.getElementById('event-detail').innerHTML='<p>Event not found.</p>';return}
  const e = await res.json()
  const progress = e.goal_amount>0?Math.min(100,Math.round((e.raised_amount/e.goal_amount)*100)):0
  document.getElementById('event-detail').innerHTML = `
    <div class="card"><img src="${e.image_url||'assets/images/placeholder.jpg'}"><h2>${e.name}</h2><p class="meta">${e.start_date} to ${e.end_date} • ${e.location}</p><p>Category: ${e.category}</p><p>Organized by: ${e.organization} (${e.contact_email||'n/a'})</p><h3>About</h3><p>${e.description}</p><h3>Tickets & Goal</h3><p>Goal: $${Number(e.goal_amount).toFixed(2)} • Raised: $${Number(e.raised_amount).toFixed(2)}</p><div style="background:#e6eef6;border-radius:10px;padding:6px;margin:8px 0"><div style="width:${progress}%;background:#0f172a;color:#fff;padding:8px;border-radius:6px;text-align:center">${progress}%</div></div><button id="register" class="btn">Register / Donate</button></div>
  `
  document.getElementById('register').addEventListener('click',()=>modalE.classList.remove('hidden'))
}
loadEvent()
