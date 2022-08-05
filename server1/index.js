const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// import fetch from 'node-fetch';
// const fetch = require('node-fetch')
const request = require('./req')
const { Temp, Response } = require('./models')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

mongoose
  .connect('mongodb://localhost/server1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected')
  })
  .catch(err => {
    console.error(err)
  })

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Connected to Server ${PORT}`)
})



for (let index = 0; index < request.length; index++) {
  console.log(`request ${index} : ${request[index]}`)
  askToServer2(request[index])
}

async function askToServer2 (body) {
  const response = await fetch('http://localhost:3010/ask', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()

  console.log(data)

  await new Temp({
    name: data.name,
    age: data.age,
    mobile: data.mobile,
    msg: data.msg,
    reqId: data.reqId,
    reqStatus: data.reqStatus
  }).save()
}

app.use(bodyParser.json())

app.use('/', router)

router.post('/validate', async (req, res) => {
  console.log('validate Called')

  console.log(`Req Id : ${req.body.reqId}`)
  console.log(`response_s : ${req.body.response_s}`)
  let temp = await Temp.findOne({ reqId: req.body.reqId })
  console.log(`Temp : ${temp}`)

  // return // Tempory return;

  const saveRes = new Response({
    name: temp.name,
    age: temp.age,
    mobile: temp.mobile,
    msg: temp.msg,
    reqId: temp.reqId,
    reqStatus: temp.reqStatus,
    response_s: req.body.response_s
  })

  saveRes.save(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      Temp.findByIdAndRemove(temp._id)
        .then(e => {
          console.log('Deleted')
        })
        .catch(console.error)
    }
  })

  let status = 'OK'

  if (req.body.response_s !== 'na') {
    status = 'Bad Request'

    return res.status(405).send(status)
  }

  return res.status(200).send(status)
})
