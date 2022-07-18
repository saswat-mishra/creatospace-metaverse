var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

let router = express.Router();

//User Model
var user = require("../model/user");
var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

/* login api */
router.post("/login", (req, res) => {
  //google Oauth login
  try {
    if (req.body && req.body.email && req.body.password) {
      console.log(req.body);

      user.find({ email: req.body.email }, (err, data) => {
        console.log(data);
        if (data.length > 0) {
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            console.log(checkUserAndGenerateToken(data[0], req, res));
          } else {
            res.status(400).json({
              errorMessage: "email or password is incorrect!",
              status: false,
            });
          }
        } else {
          res.status(400).json({
            errorMessage: "email or password is incorrect!",
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* register api */
router.post("/register", (req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {
      user.find({ email: req.body.email }, (err, data) => {
        if (data.length == 0) {
          let User = new user({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              console.log("Registered Successfully.");
              res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `email ${req.body.email} Already Exist!`,
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.email, id: data._id },
    "shhhhh11111",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          data: { token: token, uid: data.id },
          status: true,
        });
      }
    }
  );
}

/* Api to add room */
//curl https://prod-in2.100ms.live/api/v2/rooms -H 'Authorization: Bearer  <management_token>' -X POST -H 'Content-Type: application/json' -d '{"name": "test-room", "description": "This is a test room", "recording_info": {"enabled": true, "upload_info": {"type": "s3", "location": "test-bucket", "prefix": "test-prefix", "options": {"region": "ap-south-1"}, "credentials": {"key": "aws-access-key", "secret": "aws-secret-key"}}}}'
var axios = require("axios");
// const { token } = require("./utils/hmsmangtoken.js");
// var mang = require('./utils/hmsmangtoken.js')
var app_access_key = "62bb69b476f8697390a6a7da";
var app_secret =
  "V3s1siiqQZfBoBuVHgb_OUUkkl6cFzfsRxK-GsmkXwZepVLZiyna8ZSRAIBZuvO6TqppYx9bBZseApyWAFCKRounMCvAqdGAX9-xA3vsUusWr4xGkHqEWaLjL4xRcgE5TDDZ-jkNISuWlAoKDc-utBUg-ya2b_zgywuUeIudF1Q=";

const token = jwt.sign(
  {
    access_key: app_access_key,
    type: "management",
    version: 2,
    iat: Math.floor(Date.now() / 1000) - 20,
    nbf: Math.floor(Date.now() / 1000),
  },
  app_secret,
  {
    algorithm: "HS256",
    expiresIn: "24h",
    jwtid: uuid4(),
  }
);

var template = async () => {
  let temp =
  await axios
    .post(
      "https://prod-policy.100ms.live/policy/v1/templates",
      JSON.stringify({
        name: "template",
        default: true,
        roles: {
          speaker: {
            name: "speaker",
            publishParams: {
              allowed: ["video", "screen", "audio"],
              audio: {
                bitRate: 32,
                codec: "opus",
              },
              video: {
                bitRate: 250,
                codec: "vp8",
                frameRate: 30,
                width: 480,
                height: 270,
              },
              screen: {
                codec: "vp8",
                frameRate: 10,
                width: 1920,
                height: 1080,
              },
            },
          },
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((r) => {
      console.log('from temp', r.data.name);
      return r.data.name;
    }).catch((err) => {
      console.log(err);
    });
    // console.log('after temp', temp.data.name);
    // return temp.data.name;

};

// console.log(template());    //Commented By Aman Beacuse This is causing Promise <pending> error.
// const createroom = () => {
  // const data =
  // axios
  //   .post(
  //     "https://prod-in2.100ms.live/api/v2/rooms",
  //     JSON.stringify({
  //       name: "test-room",
  //       description: "This is a test room",
  //       recording_info: {
  //         enabled: true,
  //         upload_info: {
  //           type: "s3",
  //           location: "test-bucket",
  //           prefix: "test-prefix",
  //           options: { region: "ap-south-1" },
  //           credentials: {
  //             key: "aws-access-key",
  //             secret: "aws-secret-key",
  //           },
  //         },
  //       },
  //     }),
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     console.log(res);
  //     return res.data.id;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
// };



function token2(room_id, user_id, role) {
  var payload = {
    access_key: "62bb69b476f8697390a6a7da",
    room_id: room_id,
    user_id: user_id,
    role: role,
    type: "app",
    version: 2,
    iss: "http://localhost:3000",
    iat: Math.floor(Date.now() / 1000)-20,
    nbf: Math.floor(Date.now() / 1000),
  };
  var secret =
    "V3s1siiqQZfBoBuVHgb_OUUkkl6cFzfsRxK-GsmkXwZepVLZiyna8ZSRAIBZuvO6TqppYx9bBZseApyWAFCKRounMCvAqdGAX9-xA3vsUusWr4xGkHqEWaLjL4xRcgE5TDDZ-jkNISuWlAoKDc-utBUg-ya2b_zgywuUeIudF1Q";
  // console.log(secret, payload, "1");

  // console.log(secret, "1");
  const tok = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "24h",
    jwtid: uuid4(),
  });

  return tok;
}

router.post("/token", (req, res) => {
  try {
    // console.log(req.body.room_id, req.headers, req.body.role)
    console.log(req.body.room_id, req.headers, req.body.role);
    if (req.body && req.body.room_id && req.body.role) {
      const to = token2(req.body.room_id, req.user.id, req.body.role);
      if (to) {
        // console.log( jwt.verify('token', secret))
        res.status(200).json({
          status: true,
          title: to,
        });
      } else {
        res.status(400).json({
          errorMessage: "No tokens!",
          status: false,
        });
      }
      var payload = {
        access_key: "62bb69b476f8697390a6a7da",
        room_id: req.body.room_id,
        user_id: req.user.id,
        role: req.body.role,
        type: "app",
        version: 2,
        iat: Math.floor(Date.now() / 1000)-20,
        nbf: Math.floor(Date.now() / 1000),
      };
      var secret =
        "V3s1siiqQZfBoBuVHgb_OUUkkl6cFzfsRxK-GsmkXwZepVLZiyna8ZSRAIBZuvO6TqppYx9bBZseApyWAFCKRounMCvAqdGAX9-xA3vsUusWr4xGkHqEWaLjL4xRcgE5TDDZ-jkNISuWlAoKDc-utBUg-ya2b_zgywuUeIudF1Q";
      console.log(secret, payload, "1");

      console.log(secret, "1");
      jwt.sign(
        payload,
        secret,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: uuid4(),
        },
        function (err, token) {
          if (token) {
            res.status(200).json({
              status: true,
              title: token,
            });
          } else {
            res.status(400).json({
              errorMessage: "No tokens!",
              status: false,
            });
          }
        }
      );
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* Api to add joinee room */
router.post("/add-joinee", (req, res) => {
  try {
    if (req.body.id) {
      room.findById(req.body.id, (err, new_room) => {
        if (req.body.joinees == []) {
          new_room.joinees += req.body.jooinee_id;
        }

        new_room.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false,
            });
          } else {
            res.status(200).json({
              status: true,
              title: "room updated.",
            });
          }
        });
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

router.post("/token", (req, res) => {
  try {
    console.log(req.body.room_id, req.headers, req.body.role);
    if (req.body && req.body.room_id && req.body.role) {
      var payload = {
        access_key: "62bb69b476f8697390a6a7da",
        room_id: req.body.room_id,
        user_id: req.user.id,
        role: req.body.role,
        type: "app",
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
      };
      var secret =
        "V3s1siiqQZfBoBuVHgb_OUUkkl6cFzfsRxK-GsmkXwZepVLZiyna8ZSRAIBZuvO6TqppYx9bBZseApyWAFCKRounMCvAqdGAX9-xA3vsUusWr4xGkHqEWaLjL4xRcgE5TDDZ-jkNISuWlAoKDc-utBUg-ya2b_zgywuUeIudF1Q";
      console.log(secret, payload, "1");

      console.log(secret, "1");
      jwt.sign(
        payload,
        secret,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: uuid4(),
        },
        function (err, token) {
          if (token) {
            res.status(200).json({
              status: true,
              title: token,
            });
          } else {
            res.status(400).json({
              errorMessage: "No tokens!",
              status: false,
            });
          }
        }
      );
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

module.exports = router;