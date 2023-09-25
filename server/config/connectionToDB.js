const mongoose = require("mongoose");

const connectiontoDB = () => {
    mongoose.connect(process.env.DB_URL).then((resp) => {
        console.log("DB Connection to", resp.connection.host)
    })
        .catch((err) => {
            console.log("Error while connecting to DB", err.message)
        })
}

module.exports = connectiontoDB