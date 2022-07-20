const express = require("express");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

let router = express.Router();

//Room Model
const room = require("../model/room");

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

var axios = require("axios");
// const { token } = require("./utils/hmsmangtoken.js");
// var mang = require('./utils/hmsmangtoken.js')
var app_access_key = "62bb69b476f8697390a6a7da";
var app_secret =
  "V3s1siiqQZfBoBuVHgb_OUUkkl6cFzfsRxK-GsmkXwZepVLZiyna8ZSRAIBZuvO6TqppYx9bBZseApyWAFCKRounMCvAqdGAX9-xA3vsUusWr4xGkHqEWaLjL4xRcgE5TDDZ-jkNISuWlAoKDc-utBUg-ya2b_zgywuUeIudF1Q=";
  var jwt = require("jsonwebtoken");
  var uuid4 = require("uuid4");

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
              allowed: ["screen", "audio"],
              audio: {
                bitRate: 32,
                codec: "opus",
              },
              video: {
                bitRate: 250,
                codec: "vp8",
                frameRate: 30,
                width: 480,
                height: 270
            },
              screen: {
                codec: "vp8",
                frameRate: 10,
                width: 1920,
                height: 1080,
              },
            },
          },
          attendee: {
            name: "attendee",
            publishParams: {
              allowed: ["audio"],
              audio: {
                bitRate: 32,
                codec: "opus",
              },
              video: {
                bitRate: 250,
                codec: "vp8",
                frameRate: 30,
                width: 480,
                height: 270
            },
              screen: {
                codec: "vp8",
                frameRate: 10,
                width: 1920,
                height: 1080,
              },
            },
          }
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((r) => {
      console.log('from temp', r);
      return r;
    }).catch((err) => {
      console.log(err);
    });
    console.log('after temp', temp.data.name);
    return temp.data.name;

};

router.post("/add-room", async (req, res) => {
    try {
      console.log(await template(), 'before function');
  
      if (req.body && req.body.name && req.body.desc && req.body.price && template()) {
        var tem = await template();
        console.log(tem, 'from function');
        axios
          .post (
            "https://prod-in2.100ms.live/api/v2/rooms",
            JSON.stringify({
              name: req.body.name,
              description: req.body.desc,
              template: tem,
              recording_info: {
                enabled: true,
                upload_info: {
                  type: "s3",
                  location: "creatospace-hms",
                  prefix: "hms",
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
            console.log(resp.data.id, req);
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
            // return res.data.id;
          })
          .catch((err) => {
            console.log(err);
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
  
  /* Api to update room */
router.post("/update-room", upload.any(), (req, res) => {
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
router.get("/all-rooms", (req, res) => {
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
  router.post("/get-room", (req, res) => {
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

router.post("/delete-room", (req, res) => {
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
  

module.exports = router;