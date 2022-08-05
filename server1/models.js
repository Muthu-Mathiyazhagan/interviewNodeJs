const mongoose = require('mongoose')

const Response = mongoose.model(
  'Response',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
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

const Temp = mongoose.model(
  'temp',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
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
    }
  })
)

module.exports = {
  Temp,
  Response
}
