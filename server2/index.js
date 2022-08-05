const express = require('express')
const app = express()
const router = express.Router()
let response
const bodyParser = require('body-parser')
const { json } = require('body-parser')
app.use(bodyParser.json())
const randomStatus = ['Yes', 'No', 'na']
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

app.use('/', router)

const PORT = 3010

app.listen(PORT, () => {
  console.log(`Connected to Server ${PORT}`)
})

router.post('/ask', async (req, res) => {
  console.log('Ask Called')

  console.log(`Req.Body : ${req.body.age}`)

  // If the Age  number error code 00
  let requestID = new Date().getTime()
  console.log(`randomStatus[requestID % 3] : ${randomStatus[requestID % 3]}`)
  console.log(`requestID : ${requestID}`)
  if (typeof req.body.age == 'number') {
    response = {
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile,
      msg: req.body.msg,
      reqId: requestID,
      reqStatus: {
        Status: 'Success'
      }
    }
    server2to1(requestID)

    return res.send(response).status(200)
  } else {
    // handle if the Input is not Number
    console.log(`Its Must be String: ${typeof req.body.age}`)

    response = {
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile,
      msg: req.body.msg,
      reqId: requestID,
      reqStatus: {
        Status: 'Failure',
        code: '00',
        msg: 'Age Field Must be String.!'
      }
    }

    server2to1(requestID) // Do we need to continue if the input is Wrong ?
    return res.send(response).status(404)
  }
})

async function server2to1 (requestID) {
  console.log('Server221 Called')
  setTimeout(async () => {
    let body = {
      reqId: requestID,
      response_s: randomStatus[requestID % 3]
    }

    const finalResponse = await fetch('http://localhost:3000/validate', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })

    const { status } = finalResponse
    console.log(`status : ${status}`)
  }, 2000)
}
