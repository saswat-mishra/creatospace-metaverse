var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/creatoSpace"
);


//Importing Routes
const creatorRoute = require('./Routes/Creater.route');
const roomRoute = require('./Routes/room.route');
const credRoute = require('./Routes/credentials.route');




app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false,
  })
);

//Using Routes
app.use('/creator', creatorRoute);
app.use('/', roomRoute);
app.use('/', credRoute);

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/" || req.path == "/creator") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, "shhhhh11111", function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: "User unauthorized!",
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});





app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
