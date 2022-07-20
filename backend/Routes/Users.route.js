const express = require("express");

let router = express.Router();

//user Model
const user = require("../model/user");

// Read User
router.get("/", (req, res) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

router.get("/user/:id", (req, res) => {
  user.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(err);
    } else {
      res.json(data);
      console.log("Result : ", data);
    }
  });
});

// Update user
router
  .route("/update-user/:id")
  .get((req, res) => {
    user.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  .put((req, res, next) => {
    user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log("Creator updated successfully !");
        }
      }
    );
  });

// Delete user account
router.delete("/delete-userAccount/:id", (req, res, next) => {
  user.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
