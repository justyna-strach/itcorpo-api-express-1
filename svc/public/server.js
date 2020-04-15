const express = require('express');
const app = express();
const axios = require('axios');

import { getProjectWithEmployees } from './api'
// const { getProjectWithEmployees } = require('./api')

// CHAIN OF RESPONSIBILITY // pierwszy który obsłuży - zamyka temat
// middleware // każdy może coś dodać, ale tylko jeden może wysłać odpowiedź

// TODO: npmjs:yargs
const PORT = 3010

app.get('/', (req, res, next) => {
  res.send("facade")
  next() // podaj dalej
})

app.get('/benefits', (req, res, next) => {
  // 1. fetch data from localhost:3013 (benefit service)
  axios.get('http://localhost:3013/benefits')
    .then(response => res.send(response.data))
  // res.send(benefits)
  // 2. import data from files
})

app.get('/benefits/:id', (req, res, next) => {
})

app.get('/projects/:id', async (req, res, next) => {
  const projectId = req.params.id
  console.log(`received request with projectId:${projectId}`)
  const project = await getProjectWithEmployees(projectId)
  res.status(200).send(project)
  console.log('tu bylem')

  next()
})

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`)
})
