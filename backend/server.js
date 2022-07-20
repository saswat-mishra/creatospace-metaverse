var express = require("express");
var app = express();
var jwt = require("jsonwebtoken");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/CreatoSapce';
const Url = "mongodb+srv://creatospacemeta:Wx80Hq6fKZxeFg42@cluster0.9no6t.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(Url);

//Running On
const PORT = process.env.PORT || 2000;

//Importing Routes
const creatorRoute = require('./Routes/Creater.route');
const roomRoute = require('./Routes/room.route');
const credRoute = require('./Routes/credentials.route');
const userRoute = require('./Routes/Users.route');


app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Using Routes
app.use('/creator', creatorRoute);
app.use('/', credRoute);
app.use('/', userRoute);

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

app.use('/', roomRoute);


app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});


app.listen(PORT, () => {
  console.log("Server is Runing On port 2000");
});
