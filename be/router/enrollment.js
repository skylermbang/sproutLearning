const express = require("express");
const router = express.Router();
const Enrollment = require("../schemas/enrollment");
const authMiddleware = require("../middlewares/auth-middleware");
const meMiddleware = require("../middlewares/me-middleware");
const mongoose = require('mongoose');


// Get all enrollment details
router.get('/', async (req, res) => {
    console.log("API Get Enrollment");
    try {
        const enrollments = await Enrollment.find({});
        res.status(200).json({
            success: true,
            enrollment: enrollments
        });
    } catch (error) {
        console.error("Error fetching enrollment info:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve enrollment info",
            error: error.message
        });
    }
});

// Enroll in a class
router.post('/', meMiddleware, async (req, res) => {
    console.log("API enroll in the class");
    const userId = res.locals.user.userId;
    
    try {
        const { classId } = req.body;
        console.log( classId, userId)
        // Check if the user is already enrolled in the class
        const existingEnrollment = await Enrollment.findOne({
            studentId: userId,
            classId: classId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "User is already enrolled in this class."
            });
        }

        // If no existing enrollment, create a new enrollment
        const newEnrollment = await Enrollment.create({
            studentId: userId,
            classId: classId
        });

        res.status(201).json({
            success: true,
            message: "Successfully Enrolled in the Class",
            enrollment: newEnrollment
        });
    } catch (error) {
        console.error("Error in Enrollment Process:", error.message);
        res.status(500).json({success: false, message: 'Internal Server Error' });
        }
    });

// Cancel enrollment in a class
router.delete('/users/:userId/classes/:classId', meMiddleware, async (req, res) => {
    console.log("API: Cancel Class");
    try {
        const { userId, classId } = req.params;
        if (userId !== res.locals.user.userId) {
            return res.status(403).send({
                success: false,
                errorMessage: 'No permission to delete this enrollment.'
            });
        }
        // Delete the enrollment document matching userId and classId
        const deletedEnrollment = await Enrollment.findOneAndDelete({ studentId: userId, classId });
        if (!deletedEnrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found for the specified class and user.'
            });
        }

        res.status(200).json({ success: true, message: 'Successfully unenrolled from the class.' });
    } catch (error) {
        console.error("Error unenrolling from class:", error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});

// Get specific user's enrollments
router.get('/users/:userId', async (req, res) => {
    console.log("API Get Specific User's Enrollment");
    try {
        const { userId } = req.params;
        const userEnrollments = await Enrollment.find({ studentId: userId });
        res.status(200).json({
            success: true,
            enrollment: userEnrollments
        });
    } catch (error) {
        console.error("Error fetching enrollment data:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve enrollment data",
            error: error.message
        });
    }
});

module.exports = router;
