const express = require("express");

const router =
express.Router();

const Decoration =
require("../models/Decoration");

const upload =
require("../config/multer");

// GET ALL

router.get(
  "/",
  async (req, res) => {

    try {

      const decorations =
      await Decoration.find();

      res.json(
        decorations
      );

    }
    catch (error) {

      res.status(500).json({
        message:
        error.message,
      });

    }

  }
);

// ADD DECORATION

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const decoration =
      new Decoration({

        title:
        req.body.title,

        code:
        req.body.code,

        price:
        req.body.price,

        image:
        req.file.path,

      });

      await decoration.save();

      res.status(201).json(
        decoration
      );

    }
    catch (error) {

      res.status(500).json({
        message:
        error.message,
      });

    }

  }
);

module.exports =
router;