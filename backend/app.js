const path = require('path');
//MongoDb user + pass:  Nick : Nmb7GD5t3pfXWQFH
//Add whitelist entry: Whitelist Entry: 71.13.154.190
//whitelist ip add should be ip address of server once the application is deployed.

//comment

//imports express which is installed.
//install express with npm install --save express.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Post is captialize, bc convention indicates it defines
//object defined by blueprint. file location of post.js, (leave off .js)

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
mongoose.connect("mongodb+srv://Nick:" + process.env.MONGO_ATLAS_PW + "@cluster0-qzyw7.mongodb.net/node-angular").then(() => {
  console.log('Connected to database!');
}).catch(()=>{
  console.log('Connection failed');
});


/*
//midleware
app.use((req, res, next) => {
  console.log('First middleware');
  //call next if you are not sending a response.
  next();
});
*/

// parss json body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("images")));

//sets CORS
app.use( (req, res, next) =>{
  //sets header for CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("posts/", postsRoutes);
app.use("user/", userRoutes);
// app.use("/api/posts/", postsRoutes);
// app.use("/api/user/", userRoutes);
//to export app:
module.exports = app;

//will be imported in server.js
