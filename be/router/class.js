const express = require("express")
const router = express.Router()
const Class = require("../schemas/class")
const User = require("../schemas/users")
const authMiddleware = require("../middlewares/auth-middleware")
const meMiddleware=require('../middlewares/me-middleware')


// geting all the classes
// need paginations or only shows the upcomming classes in the future
router.get('/', async (req, res) => {
    console.log("API Get all the classes");
    try {
        const classList = await Class.find({});  
                res.status(200).json({
            success: true,
            classes: classList
        });
        
    } catch (error) {
        console.error("Error fetching classes:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve classes",
            error: error.message  // Optional: include the error message for debugging
        });
    }
});



router.post('/', meMiddleware, async (req, res) => {
    console.log("API post class");
    const userId = res.locals.user.userId;  // User ID from the middleware

    try {
        const { classId,name, startDate, time, location, capacity, teacher, desc } = req.body;

      const classDateString = `${startDate}T${time}:00.000Z`;
      const classDate = new Date(classDateString);

      // Log the constructed date
      console.log("Constructed Date:", classDate);

      // Check if the constructed date is valid
      if (isNaN(classDate.getTime())) {
          throw new Error("Invalid Date");
      }
        const newClass = await Class.create({
            classId,
            name,
            date: classDate,  // Store as Date object
            time,  // Store time as a string
            location,
            capacity,
            teacher,
            desc,
            createdBy: userId
        });
        console.log("class created")
        // Respond with the newly created class
        res.status(201).json({
            success: true,
            message: "Class created successfully",
            class: newClass  // Send the created class back to the client
        });

    } catch (error) {
        // Handle any errors during the creation process
        console.error("Error creating class:", error.message);
        res.status(500).json({
            success: false,
            message: error.message  // Send error message to the client
        });
    }
});


router.put('/:classId', authMiddleware, async (req, res) => {
    console.log("API: Update Class");
    const userId = res.locals.user.userId; 

    try {
        const { classId } = req.params; // Get classId from URL
        const {name, date, time, location, capacity,  teacher, desc} = req.body;    // Data to update (sent from frontend)

        // Find the class by classId and ensure the user who created it is updating it
        const existingClass = await Class.findOne({ classId });

        if (!existingClass) {
            return res.status(404).send({ success: false, message: 'Class not found' });
        }
    
        // Perform the update
        const updatedClass = await Class.findOneAndUpdate(
            { classId },  // Find class by classId
            { name, date, time, location, capacity, teacher, desc }, // Update fields passed from the frontend
            { new: true }  // Return the updated document
        );

        // Return the updated class
        res.status(200).json({ success: true, updatedClass });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});



router.delete('/:classId', authMiddleware, async function (req, res) {
    console.log("API: Delete Class");
    try {
        const { classId } = req.params;  // Get classId from the URL
        const userId = res.locals.user.userId;  // Get userId from authMiddleware
        const user = await User.findOne({ userId });
        // Check if the user exists and is an admin
        if (!user) {
            return res.status(400).send({
                success: false,
                errorMessage: 'User not found.',
            });
        }
        if (!user.admin) {
            return res.status(403).send({
                success: false,
                errorMessage: 'No permission to delete this class.',
            });
        }
        const isExist = await Class.findOne({ classId });
        if (!isExist) {
            return res.status(404).send({
                success: false,
                errorMessage: 'Class not found.',
            });
        }
        // Delete the class
        await Class.deleteOne({ classId });
        res.status(200).json({ success: true, message: 'Class deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});


router.get('/:classId', async (req, res) => {
    console.log("API Get Specific Class Info");
    try {
        const { classId } = req.params; 
        const chosenClass = await Class.findOne({classId});  
                res.status(200).json({
            success: true,
            class: chosenClass
        });
        
    } catch (error) {
        console.error("Error fetching classe:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve classe",
            error: error.message  
        });
    }
});

//reference in the future need to make Error like this 
router.put('/:todoId/check', authMiddleware, async function (req, res) {
    const todoId = req.params.todoId;
    const user_id = res.locals.user.user_id;
    let todoItem, check;

    if (!user_id) {
        throw new Error(ERROR.INVALID_AUTH);
    }

    todoItem = await Todo.findOne({ id: todoId })

    if(!todoItem){
        throw new Error(ERROR.NO_EXISTS_DATA);
    }

    try {

        if(todoItem.checked == true) { 
            check = false
        }else{
            check = true
        }

        await Todo.updateOne({ id : todoId }, { $set : { checked : check }});

        todoItem = await Todo.findOne({ id: todoId })
        
        res.json({ msg: 'success', data: todoItem });
    } catch (err) {
        console.log(err);
        res.json({ msg: 'fail' });
    }
});

module.exports = router