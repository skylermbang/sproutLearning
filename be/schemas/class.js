const mongoose = require("mongoose");
const { Schema } = mongoose;
require('dotenv').config();

let mongo_url = process.env.MONGO_DB;
var connection = mongoose.createConnection(mongo_url);


// Define the class schema
const classSchema = new Schema({
    id: Number,
    classId: { type: String, unique: true },  // Ensure classId is unique
    name: { type: String, required: true },   // Required field for class name
    date: { type: Date, required: true },     // Date when the class starts
    time: { type: String, required: true },   // Time for the class
    location: { type: String, required: true }, // Class location
    capacity: { type: Number, required: true }, // Number of seats available
    status: { type: String, default: "open" }, // Status: "open", "full", "in-progress"
    teacher: { type: String, required: true }, // Name of the teacher
    desc: { type: String },                    // Optional class description
    createdAt: { type: Date, default: Date.now },  // Auto-set creation date
    createdBy: { type: String }                // User who created the class
});



// Export the user model
module.exports = connection.model('class', classSchema);
