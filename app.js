// jshint esversion: 6

//requiring express
const express = require("express");
//requiring body-parser
const bodyParser = require("body-parser");
//requiring request
const request = require("request");


const app = express();
// use to connect the static css
app.use(express.static("public"));

// use body-parser urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_feilds:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    var options ={
        url: "https://us4.api.mailchimp.com/3.0/lists/c06dc73db0",
        method: "POST",
        headers: {
            "Authorization": "bivor1 96d049fcac89e1dc43d19d750c9b28b2-us4"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname +"/failiure.html");
            
        }
        else{
            if (response.statusCode === 200) {
                res.sendFile(__dirname +"/success.html");
                
            } else {
                res.sendFile(__dirname +"/failiure.html");
                
            }
            
        }
    });

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log ("Server is running on port 3000");
})



//api key = 96d049fcac89e1dc43d19d750c9b28b2-us4 
//aud key = c06dc73db0