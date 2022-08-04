const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

const PORT = 3000;

const Response = mongoose.model("Response", new mongoose.Schema(


    {
        "name": req.body.name,
        "age": req.body.age,
        "mobile": req.body.mobile,
        "msg": req.body.msg,
        "reqId": requestID,
        "reqStatus":{
            "Status":"Success"
        }


    name: {
      type: String,     
      required: true,
    },
    age : {
        type :Number,
        required : true
    },
    mobile: {
        type: String,     
        required: true,
      },

      msg: {
        type: String,     
        required: true,
      },
      reqId: {
        type: String,     
        required: true,
      },
      reqStatus: {
        type: Object,     
        required: true,
      },
      response_s: {
        type: String,     
        required: true,
      },

  }));


  router.post('/validate',(req,res)=>{
    if (req.body.response.response_s !== 'na') {


        await new Response({

            name: req.body.name,
            age: req.body.age,
            mobile: req.body.mobile,
            msg:req.body.msg,
            reqId:req.body.reqId,
            reqStatus:req.body.reqStatus,
            response_s : req.body.response_s
          }).save();

        return res.send("Bad request").status(405);
        
    }else{


        await new Response({

            name: req.body.name,
            age: req.body.age,
            mobile: req.body.mobile,
            msg:req.body.msg,
            reqId:req.body.reqId,
            reqStatus:req.body.reqStatus,
            response_s : req.body.response_s
          }).save();

        return res.send("OK").status(200);

    }
});
    


mongoose
        .connect("mongodb://localhost/server1", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected");
                  })
        .catch((err) => {
            console.error(err);
        });



app.listen(PORT, () => {
    console.log(`Connected to Server ${PORT}`);
});
