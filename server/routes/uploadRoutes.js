const express =
require("express");

const router =
express.Router();

router.get("/", (req, res) => {
    res.send("Upload Route Working");
});

const upload =
require("../config/multer");

router.post(
"/",
upload.array(
"images",
10
),
(req,res)=>{

const files =
req.files.map(file =>

"/uploads/" +
file.filename

);

res.json(files);

});

module.exports =
router;

