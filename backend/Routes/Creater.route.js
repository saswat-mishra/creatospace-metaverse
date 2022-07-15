const express = require("express");

let router = express.Router();

//creator Model
const creator = require("../model/creator");


// Create a Creater
router.post("/", (req, res) => {
    try {
            if(req.body.isCreator === true){
                res.status(400).json({
                    errorMessage: "Already a creator",
                    status: false,
                });
            }else {
                let Creator = new creator({
                    name: req.body.name,
                    email: req.body.email,
                    isCreator: true
                });
                Creator.save((err, data) => {
                    if (err) {
                        res.status(400).json({
                            errorMessage: err,
                            status: false,
                        });
                    } else {
                        console.log(req.body.name);
                        res.status(200).json({
                            status: true,
                            title: "Mission Acomplished",                   
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

// Read Creator
router.get("/", (req, res) => {
    creator.find((error, data) => {
	    if (error) {
	        return next(error);
	    } else {
	        res.json(data);
	    }
});
});

// Update creator
router
.route("/update-creator/:id")
.get((req, res) => {
	creator.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

.put((req, res, next) => {
	creator.findByIdAndUpdate(
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

// Delete creator
router.delete("/delete-creator/:id",
(req, res, next) => {
creator.findByIdAndRemove(
	req.params.id, (error, data) => {
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
