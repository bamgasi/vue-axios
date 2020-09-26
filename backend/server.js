const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 3000

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

const authRouter = require('./routes/auth')
app.use('/api/user', authRouter)

mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database Connection OK!!')
)

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
)
