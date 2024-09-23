const mongoose = require("mongoose");
const { Schema } = mongoose;
require('dotenv').config();

let mongo_url = process.env.MONGO_DB;
var connection = mongoose.createConnection(mongo_url);


// Define the class schema
const enrollmentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the student (from Users collection)
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the class (from Classes collection)
    enrollmentDate: { type: Date, default: Date.now }, // Date when the student enrolled
    status: { type: String, default: 'enrolled' }, // Status: enrolled, dropped, completed, etc.
});


// Export the user model
module.exports = connection.model('enrollment', enrollmentSchema);
