const mongoose = require("./db");
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const port = 5000
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//Available Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})