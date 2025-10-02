
const path = require('path')
const express = require('express')
const app = express()
const api = require('./api')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api', api)

app.use(express.static(path.join(__dirname, '../frontend')))

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`)
})
