const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Server has been setup"
    })
})

const PORT = 5001

app.listen(PORT, () => {
    console.log("Server has started Successfully")
})