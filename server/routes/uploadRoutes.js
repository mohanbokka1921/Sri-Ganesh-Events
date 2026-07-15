const express = require("express");

const router =
express.Router();

const upload =
require("../config/multer");

router.post(
  "/",
  upload.single("image"),
  (req, res) => {

    res.status(200).json({
      imageUrl: req.file.path,
    });

  }
);

module.exports =
router;