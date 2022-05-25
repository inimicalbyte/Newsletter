const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
})

app.post("/",function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  }
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us6.api.mailchimp.com/3.0/lists/061296581f",
    method: "POST",
    headers:{
      "Authorization":"Abhinav a2cea4705bf08726bae3660324f07df5-us6"
    },
    body:jsonData
  }
  request(options,function(error,response,body){
    if(error){
      res.sendFile(__dirname +"/failure.html");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname +"/success.html");
      } else {
        res.sendFile(__dirname +"/failure.html");
      }
    }
  })
})

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("server is listening to port 3000....");
});
