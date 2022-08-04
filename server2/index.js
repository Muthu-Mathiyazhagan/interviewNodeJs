const express = require("express");
const app = express();
const router = express.Router();
let response;


const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Connected to Server ${PORT}`);
});

router.post('/ask',(req,res)=>{
    console.log("Ask Called");

    let typeOfAge = typeof(req.body.age);

    // If the Age  number error code 00
    let requestID = new Date().now();
    if (typeOfAge == 'number') {
        response = {
            "name": req.body.name,
            "age": req.body.age,
            "mobile": req.body.mobile,
            "msg": req.body.msg,
            "reqId": requestID,
            "reqStatus":{
                "Status":"Success"
            }
        }
        server2to1(requestID,response);

        return res.send(response).status(200);
        
    }else {
        // handle if the Input is not Number

        response = {

            "name": req.body.name,
            "age": req.body.age,
            "mobile": req.body.mobile,
            "msg": req.body.msg,
            "reqId": requestID,
            "reqStatus":{
                "Status":"error":{
                    "code":"00",
                    "msg":"the given age must be Number only"
                }
            }
        }
        server2to1(requestID,response);
        return res.send("The Give Input is Wrong. Try again with correct Structure").status(400);

    }


    
});

const randonStatus = ['Yes','No','na'];

async function server2to1(requestID) {
    setTimeout(() => {

        response.reqId = requestID;
        response.response_s = randonStatus[requestID % 3];


        // The Response mentioned here is Req to Server One
       

        // call the Server 1 by Only One Response
    }, 2000);
    
}

