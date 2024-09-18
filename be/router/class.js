const express = require("express")
const router = express.Router()
const Class = require("../schemas/class")
const authMiddleware = require("../middlewares/auth-middleware")


router.get('/', async (req, res) => {
    console.log("API Get all the classes");
    
    try {
        const classList = await Class.find({});  // Fetch all classes
        
        // Send back the class list, even if it's empty
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



router.post('/', authMiddleware, async (req, res) => {
    console.log("API post class");
    const userId = res.locals.user.userId;  // User ID from the middleware
    try {
        const { classId,name, date, time, location, capacity,  teacher, desc } = req.body;
        
        // Create a new class and associate the `createdBy` field with the userId
        const newClass = await Class.create({
            name,
            date,
            time,
            location,
            capacity,
            teacher,
            desc,
            createdBy: userId
        });

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

    const userId = res.locals.user.userId; // Assuming your auth middleware attaches the user object

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



router.put("/:todoId", authMiddleware, async (req, res) => {
    console.log(" Updating todo ")
    const { todoId } = req.params
    const { newContent } = req.body
    const user_id = res.locals.user.user_id



    try {
        console.log(todoId)
        const isExist = await Todo.findOne({ id: todoId })
        console.log(isExist)
        if (isExist.userId === user_id) {

            //await Todo.findOneAndUpdate({ id: todoId, content: newContent })
            const filter = { id: todoId };
            const update = { content: newContent };
            let newTodo = await Todo.findOneAndUpdate(filter, update);
            res.status(200).json({ isUpdated: true })
        }

        else {

            res.status(401).send("Wrong access")
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
})



router.delete('/:todoId', authMiddleware, async function (req, res) {
    console.log("deleting todo")
    const { todoId } = req.params
    const user_id = res.locals.user.user_id
    const isExist = await Todo.findOne({ id: todoId })
    if (isExist.userId === user_id) {
        await Todo.deleteOne({ id: todoId })
        res.status(200).json({ isUpdated: true })
    }
    else {
        res.status(401).json({ isUpdated: false })
    }

});


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