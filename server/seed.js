require("dotenv").config();

const mongoose =
require("mongoose");

const Decoration =
require("./models/Decoration");

async function seed(){

await mongoose.connect(
process.env.MONGO_URI
);

await Decoration.deleteMany();

await Decoration.create({

    code:"FD001",

    title:"Royal Wedding Stage",

    category:"Marriage",

    price:25000,

    image:
    "https://picsum.photos/500",

    description:
    "Premium wedding decoration",

    flowersUsed:[
        "Rose",
        "Orchid"
    ],

    materialsUsed:[
        "LED",
        "Fabric"
    ]

});

console.log(
"Data Inserted"
);

process.exit();

}

seed();