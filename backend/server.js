var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require("path");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://creatospacemeta:Wx80Hq6fKZxeFg42@cluster0.9no6t.mongodb.net/?retryWrites=true&w=majority"
);
// mongodb+srv://creatospacemeta:Wx80Hq6fKZxeFg42@cluster0.9no6t.mongodb.net/?retryWrites=true&w=majority
var fs = require("fs");
var room = require("./model/room.js");
var user = require("./model/user.js");
var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

var dir = "./uploads";
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false,
  })
);

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
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

/* login api */
app.post("/login", (req, res) => {
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
app.post("/register", (req, res) => {
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

const template = () => {
  let temp;
  axios
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
    )
    .then((r) => {
      temp = r.data.name;
      console.log(temp);
      // if (temp) {
        return temp;
      // }
    })
    .catch((err) => {
      console.log(err);
    });
};

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

app.post("/add-room", (req, res) => {
  try {
    if (req.body && req.body.name && req.body.desc && req.body.price && template()) {
      console.log(template(), 'from function');
      axios
        .post(
          "https://prod-in2.100ms.live/api/v2/rooms",
          JSON.stringify({
            name: "workshop-room",
            description: "This is a test room",
            recording_info: {
              enabled: true,
              upload_info: {
                type: "s3",
                location: "creatospace-hms",
                prefix: "hms",
                template: template(),
                options: { region: "ap-south-1" },
                credentials: {
                  key: "AKIAXCHBHBOR3ZYHJ5FJ",
                  secret: "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",
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
        )
        .then((resp) => {
          let new_room = new room();
          new_room.name = req.body.name;
          new_room.desc = req.body.desc;
          new_room.price = req.body.price;
          new_room.hms_id = resp.data.id;
          new_room.user_id = req.user.id;
          console.log(resp);
          new_room.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              res.status(200).json({
                data: data,
                title: "room Added successfully.",
              });
            }
          });
          return res.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
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
      //     new_room.hms_id = res.data.id;
      //     new_room.save();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // const hms = createroom();
      // console.log(hms);
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

/* Api to update room */
app.post("/update-room", upload.any(), (req, res) => {
  try {
    if (
      req.files &&
      req.body &&
      req.body.name &&
      req.body.desc &&
      req.body.price &&
      req.body.id &&
      req.body.discount
    ) {
      room.findById(req.body.id, (err, new_room) => {
        // if file already exist than remove it
        if (
          req.files &&
          req.files[0] &&
          req.files[0].filename &&
          new_room.image
        ) {
          var path = `./uploads/${new_room.image}`;
          fs.unlinkSync(path);
        }

        if (req.files && req.files[0] && req.files[0].filename) {
          new_room.image = req.files[0].filename;
        }
        if (req.body.name) {
          new_room.name = req.body.name;
        }
        if (req.body.desc) {
          new_room.desc = req.body.desc;
        }
        if (req.body.price) {
          new_room.price = req.body.price;
        }
        if (req.body.discount) {
          new_room.discount = req.body.discount;
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

/* Api to get all rooms */
app.get("/all-rooms", (req, res) => {
  try {
    room.find((err, rooms) => {
      // console.log(rooms);
      res.status(200).json({
        data: rooms,
        status: true,
      });
    });
    // console.log(room.findById('62c15c6d9f6887b2bcde8a5a'));
    // res.status(200).json({
    //   status: true,
    //   data: rooms
    // });
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

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

app.post("/token", (req, res) => {
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
app.post("/add-joinee", (req, res) => {
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

app.post("/token", (req, res) => {
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

/* Api to delete room */
app.post("/delete-room", (req, res) => {
  try {
    if (req.body && req.body.id) {
      room.findByIdAndUpdate(
        req.body.id,
        { is_delete: true },
        { new: true },
        (err, data) => {
          if (data.is_delete) {
            res.status(200).json({
              status: true,
              title: "room deleted.",
            });
          } else {
            res.status(400).json({
              errorMessage: err,
              status: false,
            });
          }
        }
      );
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

// /*Api to get and search room with pagination and search by name*/
// app.get("/get-room", (req, res) => {
//   try {
//     var query = {};
//     query["$and"] = [];
//     query["$and"].push({
//       is_delete: false,
//       user_id: req.user.id
//     });
//     if (req.query && req.query.search) {
//       query["$and"].push({
//         name: { $regex: req.query.search }
//       });
//     }
//     var perPage = 5;
//     var page = req.query.page || 1;
//     room.find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
//       .skip((perPage * page) - perPage).limit(perPage)
//       .then((data) => {
//         room.find(query).count()
//           .then((count) => {

//             if (data && data.length > 0) {
//               res.status(200).json({
//                 status: true,
//                 title: 'room retrived.',
//                 rooms: data,
//                 current_page: page,
//                 total: count,
//                 pages: Math.ceil(count / perPage),
//               });
//             } else {
//               res.status(400).json({
//                 errorMessage: 'There is no room!',
//                 status: false
//               });
//             }

//           });

//       }).catch(err => {
//         res.status(400).json({
//           errorMessage: err.message || err,
//           status: false
//         });
//       });
//   } catch (e) {
//     res.status(400).json({
//       errorMessage: 'Something went wrong!',
//       status: false
//     });
//   }

// });

app.post("/get-room", (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.id) {
      room.findById(req.body.id, (err, new_room) => {
        res.status(200).json({
          data: new_room,
          status: true,
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

// app.get("/get-room", (req, res) => {
//   try {
//     var query = {};
//     query["$and"] = [];
//     query["$and"].push({
//       is_delete: false,
//       user_id: req.user.id
//     });
//     if (req.query && req.query.search) {
//       query["$and"].push({
//         name: { $regex: req.query.search }
//       });
//     }
//     var perPage = 5;
//     var page = req.query.page || 1;
//     room.find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
//       .skip((perPage * page) - perPage).limit(perPage)
//       .then((data) => {
//         room.find(query).count()
//           .then((count) => {

//             if (data && data.length > 0) {
//               res.status(200).json({
//                 status: true,
//                 title: 'room retrived.',
//                 rooms: data,
//                 current_page: page,
//                 total: count,
//                 pages: Math.ceil(count / perPage),
//               });
//             } else {
//               res.status(400).json({
//                 errorMessage: 'There is no room!',
//                 status: false
//               });
//             }

//           });

//       }).catch(err => {
//         res.status(400).json({
//           errorMessage: err.message || err,
//           status: false
//         });
//       });
//   } catch (e) {
//     res.status(400).json({
//       errorMessage: 'Something went wrong!',
//       status: false
//     });
//   }

// });

// app.get("/get-user/"+id , (req, res) => {
//   try {
//     // var user = user.findById(id);
//     user.find({ id: id }, (err, data) => {
//       if (data.length > 0) {

//         console.log(data);
//       } else {
//         res.status(400).json({
//           errorMessage: 'email or password is incorrect!',
//           status: false
//         });
//       }
//     })
//     // var query = {};
//     // query["$and"] = [];
//     // query["$and"].push({
//     //   is_delete: false,
//     //   user_id: req.user.id
//     // });
//     // if (req.query && req.query.search) {
//     //   query["$and"].push({
//     //     name: { $regex: req.query.search }
//     //   });
//     // }
//     // var perPage = 5;
//     // var page = req.query.page || 1;
//     // room.find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
//     //   .skip((perPage * page) - perPage).limit(perPage)
//     //   .then((data) => {
//     //     room.find(query).count()
//     //       .then((count) => {

//     //         if (data && data.length > 0) {
//     //           res.status(200).json({
//     //             status: true,
//     //             title: 'room retrived.',
//     //             rooms: data,
//     //             current_page: page,
//     //             total: count,
//     //             pages: Math.ceil(count / perPage),
//     //           });
//     //         } else {
//     //           res.status(400).json({
//     //             errorMessage: 'There is no room!',
//     //             status: false
//     //           });
//     //         }

//     //       });

//     //   }).catch(err => {
//     //     res.status(400).json({
//     //       errorMessage: err.message || err,
//     //       status: false
//     //     });
//     //   });
//   } catch (e) {
//     res.status(400).json({
//       errorMessage: 'Something went wrong!',
//       status: false
//     });
//   }

// });

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
