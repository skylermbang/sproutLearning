const mongoose = require("mongoose");
require('dotenv').config();
let mongo_url = process.env.MONGO_DB

const connect = () => {
    mongoose
        .connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
    console.error("mongoDB connection failed", err);
});

module.exports = connect;