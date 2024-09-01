const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
require('dotenv').config();

let mongo_url = process.env.MONGO_DB;
var connection = mongoose.createConnection(mongo_url);

// Define the user schema
const userSchema = new Schema({
    id: Number,
    userId: String,
    userNickname: String,
    email: String,
    password: String,
    admin: { type: Boolean, default: false }  
});


// Apply the AutoIncrement plugin to the userId field
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

// Export the user model
module.exports = connection.model('user', userSchema);
