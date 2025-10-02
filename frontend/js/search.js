const form = document.getElementById('search-form')
const results = document.getElementById('results')
const clearBtn = document.getElementById('clear')
const categorySelect = document.getElementById('category')
async function loadCategories(){
  const res = await fetch('/api/categories')
  const cats = await res.json()
  cats.forEach(c=>{
    const opt = document.createElement('option')
    opt.value = c.id
    opt.textContent = c.name
    categorySelect.appendChild(opt)
  })
}
form.addEventListener('submit', async e=>{
  e.preventDefault()
  const date = document.getElementById('date').value
  const location = document.getElementById('location').value
  const category = document.getElementById('category').value
  const params = new URLSearchParams()
  if (date) params.append('date',date)
  if (location) params.append('location',location)
  if (category) params.append('category',category)
  const res = await fetch('/api/search?'+params.toString())
  const data = await res.json()
  results.innerHTML = data.map(e=>`<div class="card"><img src="${e.image_url||'assets/images/placeholder.jpg'}"><h4>${e.name}</h4><p class="meta">${e.start_date} • ${e.location}</p><p>${e.short_desc||''}</p><a class="btn" href="event.html?id=${e.id}">View</a></div>`).join('')
  if(data.length===0) results.innerHTML = '<p>No matching events found.</p>'
})
clearBtn.addEventListener('click',()=>{form.reset();results.innerHTML=''} )
loadCategories()
