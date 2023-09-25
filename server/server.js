const express = require("express");
const connectiontoDB = require("./config/connectionToDB");
require("dotenv").config()
const app = express();

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Server has been setup"
    })
})


// connection to db
connectiontoDB()
const PORT = 5001

app.listen(PORT, () => {
    console.log("Server has started Successfully")
})