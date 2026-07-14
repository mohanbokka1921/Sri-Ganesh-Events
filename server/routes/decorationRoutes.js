const express = require("express");
const router = express.Router();

const Decoration =
require("../models/Decoration");

router.get("/", async (req,res)=>{

    try{

        const decorations =
        await Decoration.find();
        

        res.json(decorations);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

module.exports = router;

router.post("/", async (req, res) => {

    try {

        const decoration =
        await Decoration.create(req.body);

        res.status(201).json(decoration);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Error Creating Decoration"
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Decoration.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Decoration Deleted"
        });

    }
    catch(error){

        res.status(500).json(error);

    }

});

router.put("/:id", async (req, res) => {

    try {

        const decoration =
        await Decoration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(decoration);

    }
    catch(error){

        res.status(500).json(error);

    }

});