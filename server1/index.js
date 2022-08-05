const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// import fetch from 'node-fetch';
// const fetch = require('node-fetch')
const request = require('./req')
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetch = (url, body) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, body))

for (let index = 0; index < request.length; index++) {
  console.log(`request ${index} : ${request[index]}`)
  askToServer2(request[index])
}

async function askToServer2 (body) {
  // const body = {
  //   name: 'muthu',
  //   age: 22,
  //   mobile: '2345678',
  //   msg: 'chicken dinner'
  // }

  const response = await fetch('http://localhost:3010/ask', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()

  console.log(data)
}

const PORT = 3000

app.use(bodyParser.json())

app.use('/', router)

router.post('/validate', async (req, res) => {
  if (req.body.response_s !== 'na') {
    await new Response({
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile,
      msg: req.body.msg,
      reqId: req.body.reqId,
      reqStatus: req.body.reqStatus,
      response_s: req.body.response_s
    }).save()

    return res.send('Bad request').status(405)
  } else {
    await new Response({
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile,
      msg: req.body.msg,
      reqId: req.body.reqId,
      reqStatus: req.body.reqStatus,
      response_s: req.body.response_s
    }).save()

    return res.send('OK').status(200)
  }
})

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

app.listen(PORT, () => {
  console.log(`Connected to Server ${PORT}`)
})

const Response = mongoose.model(
  'Response',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },

    msg: {
      type: String,
      required: true
    },
    reqId: {
      type: String,
      required: true
    },
    reqStatus: {
      type: Object,
      required: true
    },
    response_s: {
      type: String,
      required: true
    }
  })
)
