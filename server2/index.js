const express = require('express')
const app = express()
const router = express.Router()
let response
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const randomStatus = ['Yes', 'No', 'na']

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
    server2to1(requestID, response)

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
        code : '00',
        msg : 'Age Field Must be String.!'
      }
    }

    console.log(`response : ${response}`)

    server2to1(requestID, response)
    return res
      .send(response)
      .status(200)
  }
});

async function server2to1 (requestID) {    
  setTimeout(() => {
    response.reqId = requestID
    response.response_s = randomStatus[requestID % 3]

    // The Response mentioned here is Req to Server One

    // call the Server 1 by Only One Response
  }, 2000)
}
