const express = require("express");
const connectiontoDB = require("./config/connectionToDB");
const UserRouter = require("./routes/userRoute");
require("dotenv").config()
const app = express();

app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send({
        message: "Server has been setup"
    })
})


app.use("/user", UserRouter)

// connection to db
connectiontoDB()
const PORT = 5001

app.listen(PORT, () => {
    console.log("Server has started Successfully")
})