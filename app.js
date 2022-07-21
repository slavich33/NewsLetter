const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// const jsdom = require('jsdom');
// const $ = require('jquery')(new jsdom.JSDOM().window);
// jQuery doesn't work for now!
const app = express();

app.use(express.static("public")); //This is a use of a styles, images e.t.c.

app.use(bodyParser.urlencoded({
  extended: true
}));




// $(".backbtn").click( function(req, res) {
//   console.log("go back");
//   res.sendFile(__dirname + "/signup.html")});

app.post("/failure", function(req,res) {
  res.redirect("/");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

// app.get("/failure", function(req, res) {
//   res.sendFile(__dirname + "/failure.html");
// })

app.post("/", function(req, res) {

  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;


  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/f31cb2c3a5";

  const options = {
    method: "POST",
    auth: "Vyacheslav:4c1357e0a1f5da2358f07e82509833f3-us12"
  }

  const request = https.request(url, options, function(responce) {

    console.log(responce.statusCode);
    if (responce.statusCode == "200") {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    responce.on("data", function(data) {
      console.log(JSON.parse(data));

    })
  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is runnning!");
});

// This is a section with mailchimp_marketing node! How to use it

// const mailchimp = require("@mailchimp/mailchimp_marketing");
//
// mailchimp.setConfig({
//   apiKey: "4c1357e0a1f5da2358f07e82509833f3-us12",
//   server: "us12",
// });

// app.post("/", function(req,res) {
//
// var fName = req.body.firstName;
// var lname = req.body.lastName;
// var email = req.body.email;
//
// const listId = "f31cb2c3a5";
// const subscribingUser = {
//   firstName: fName,
//   lastName: lname,
//   email: email
// };
//
// async function run() {
//   const response = await mailchimp.lists.addListMember(listId, {
//     email_address: subscribingUser.email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: subscribingUser.firstName,
//       LNAME: subscribingUser.lastName
//     }
//   });
//
//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`
//   );
// }
//
// run();
//
// });

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }
//
// run();

// API key
// 4c1357e0a1f5da2358f07e82509833f3-us12
// Audience id
// f31cb2c3a5
