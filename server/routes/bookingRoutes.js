const express = require("express");
const router = express.Router();

const Booking =
require("../models/Booking");

/* CREATE BOOKING */

router.post("/", async (req,res)=>{

    try{

        const booking =
        await Booking.create(req.body);

        res.status(201).json(booking);

    }
    catch(error){

        res.status(500).json(error);

    }

});

/* GET ALL BOOKINGS */

router.get("/", async (req,res)=>{

    try{

        const bookings =
        await Booking.find()
        .populate(
           "decorationId",
           "code title category price"
        );

        res.json(bookings);

    }
    catch(error){

        res.status(500).json(error);

    }

});

/* UPDATE BOOKING STATUS */

router.put("/:id", async (req,res)=>{

    try{

        const booking =
        await Booking.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );

        res.json(booking);

    }
    catch(error){

        res.status(500).json(error);

    }

});

/* DELETE BOOKING */

router.delete("/:id", async (req,res)=>{

    try{

        await Booking.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Booking Deleted Successfully"
        });

    }
    catch(error){

        res.status(500).json(error);

    }

});

module.exports = router;