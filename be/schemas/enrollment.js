const mongoose = require("mongoose");
const { Schema } = mongoose;
require('dotenv').config();

let mongo_url = process.env.MONGO_DB;
var connection = mongoose.createConnection(mongo_url);


// Define the class schema
const enrollmentSchema = new Schema({
    studentId: { type: String, ref: 'User', required: true },
    classId: { type: String, ref: 'Class', required: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: { type: String, default: 'enrolled' }
});



// Export the user model
module.exports = connection.model('enrollment', enrollmentSchema);
