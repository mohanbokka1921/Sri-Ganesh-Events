const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin =
require("../models/Admin");

const router =
express.Router();

// Test Route
router.get("/test", (req, res) => {
    res.send("Admin Route Working");
});

// Admin Login
router.post(
    "/login",
    async (req, res) => {

        try {

            const {
                username,
                password
            } = req.body;

            const admin =
            await Admin.findOne({
                username
            });

            if (!admin) {

                return res.status(400)
                .json({
                    message:
                    "Admin Not Found"
                });

            }

            const match =
            await bcrypt.compare(
                password,
                admin.password
            );

            if (!match) {

                return res.status(400)
                .json({
                    message:
                    "Wrong Password"
                });

            }

            const token =
            jwt.sign(
                {
                    id: admin._id
                },
                "flora_secret",
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                token
            });

        }
        catch (error) {

            console.error(error);

            res.status(500)
            .json({
                message:
                "Server Error"
            });

        }

    }
);

module.exports = router;