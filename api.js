const express = require('express')
const router = express.Router()
const pool = require('./event_db')
router.get('/events', async (req, res) => {
  const q = 'SELECT e.id,e.name,e.start_date,e.end_date,e.location,e.short_desc,e.image_url,c.name AS category,o.name AS organization,e.goal_amount,e.raised_amount FROM events e LEFT JOIN categories c ON e.category_id=c.id LEFT JOIN organizations o ON e.organization_id=o.id WHERE e.paused=0 ORDER BY e.start_date ASC'
  const [rows] = await pool.query(q)
  res.json(rows)
})
router.get('/events/upcoming', async (req, res) => {
  const q = 'SELECT id,name,start_date,end_date,location FROM events WHERE paused=0 AND end_date >= CURDATE() ORDER BY start_date ASC'
  const [rows] = await pool.query(q)
  res.json(rows)
})
router.get('/events/past', async (req, res) => {
  const q = 'SELECT id,name,start_date,end_date,location FROM events WHERE paused=0 AND end_date < CURDATE() ORDER BY start_date DESC'
  const [rows] = await pool.query(q)
  res.json(rows)
})
router.get('/events/:id', async (req, res) => {
  const q = 'SELECT e.*,c.name AS category,o.name AS organization,o.contact_email,o.website FROM events e LEFT JOIN categories c ON e.category_id=c.id LEFT JOIN organizations o ON e.organization_id=o.id WHERE e.id=?'
  const [rows] = await pool.query(q, [req.params.id])
  if (rows.length === 0) return res.status(404).json({error:'Not found'})
  res.json(rows[0])
})
router.get('/categories', async (req, res) => {
  const q = 'SELECT * FROM categories'
  const [rows] = await pool.query(q)
  res.json(rows)
})
router.get('/organizations', async (req, res) => {
  const q = 'SELECT * FROM organizations'
  const [rows] = await pool.query(q)
  res.json(rows)
})
router.get('/search', async (req, res) => {
  const {date,location,category} = req.query
  let conditions = ['paused=0']
  let params = []
  if (date) {
    conditions.push('DATE(?) BETWEEN DATE(start_date) AND DATE(end_date)')
    params.push(date)
  }
  if (location) {
    conditions.push('location LIKE ?')
    params.push('%'+location+'%')
  }
  if (category) {
    conditions.push('category_id = ?')
    params.push(category)
  }
  const where = conditions.length ? 'WHERE '+conditions.join(' AND ') : ''
  const q = `SELECT id,name,start_date,end_date,location,short_desc FROM events ${where} ORDER BY start_date ASC`
  const [rows] = await pool.query(q, params)
  res.json(rows)
})
module.exports = router
