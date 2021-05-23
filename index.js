const express = require('express')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@free-cluster.saw1r.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((e) => {
    console.log('Database error', e)
  })

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRoutes)

app.get('/', (req, res) => {
  res.json({ mensaje: 'My Auth Api Rest' })
})

const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
