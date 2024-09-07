const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../schemas/users')
const bcrypt = require('bcrypt');
const setRounds = 10;
require('dotenv').config();
const authMiddleware = require('../middlewares/auth-middleware')



// SingUp API - POST


router.post('/signUp', async (req, res, next) => {
    console.log( "SingUP API")
    try {
        const { userId, userNickname, password, confirmPassword , email} = req.body
    
       // Starts with an English letter, followed by 6-20 English letters or numbers
        const regUserIdExp = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/g;
        const regUserNickname = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/g;
        //Password must contain at least one letter, one number, and one special character. It should be between 8 to 16 characters long.
        const regUserPasswordExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

        const existingUser = await User.findOne({ $or: [{ userId }, { email }] });
        if (existingUser) {
            return res.status(409).send({
                errorMessage: 'User ID or email already exists. Please choose a different one.'
            });
        }

        // Validation
        if (!regUserIdExp.test(userId)) {
            return res.status(400).send({
                errorMessage: 'Wrong ID format. ID must start with a letter and be 6-20 characters long.'
            });
        }
        if (!regUserNickname.test(userNickname)) {
            console.log( "no space please")
            return res.status(400).send({
                errorMessage: 'Wrong NickName format. NickName must start with a letter and be 6-20 characters long.'
            });
        }
        if (!regUserPasswordExp.test(password)) {
            return res.status(400).send({
                errorMessage: 'Password must contain at least one letter, one number, and one special character, and be 8-16 characters long.'
            });
        }

        const salt = bcrypt.genSaltSync(setRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({ userId,userNickname, email, password: hashedPassword })
        await user.save()
        res.status(201).send({ result: "sucess" , msg: "SignUp Successful" })
    } catch (err) {
        next(err)
    }
})



//로그인 API - POST
router.post('/signIn', async (req, res) => {
    try {
        const { userId, password } = req.body

        const user = await User.findOne({ userId })
        console.log('user===', user);

        //if no user or wrong password error 
        if (!user) {
            res.status(400).send({
                sucess: false,
                errorMessage: 'Check your id or password',
            })

        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).send({
                    success: false,
                    msg: 'Check your id or password',
                });
            }
            const userId = user['userId'];
            const userNickname = user['userNickname'];

            const token =createJwtToken(userId)
            res.status(201).send({
                sucess: true,
                token,
                userId,
                userNickname,
                msg: "Login Successful"
            })
        }
    } catch (err) {
        //Internal Server Error
        console.log('Login API Error ', err);
        res
            .status(500).send({
                sucess: false,
                errorMessage: 'Unexpected Error.',
            })
    }
})

function createJwtToken(userId) {
    return jwt.sign({ userId }, process.env.SECRET_KEY || "2aibdoicndie777", { expiresIn: '24h' });
}

router.get('/:userId', async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters
    try {
        const user = await User.findOne({ userId: userId }); // Find user by userId in the database
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
      
        res.status(200).send(user); // Send the user details as response
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user
    });
});



// for internal reporting to check all the users in the system
router.get('/', async (req,res) => {
    try {
        console.log(" this is test")
        const users = await User.find({})
        res.status(201).send({ users })
    } catch (error) {
        
    }
})

// router.post('/login', async (req, res) => {
//     console.log(" login API")
//     res.status(200).json({ "isCreated": true })
// });

// router.post('/signup', async (req, res) => {
//     console.log(" signup API")

//     const { email, name, institute } = req.body
//     const isExist = await User.findOne({ email: email })
//     if (isExist) {

//         return res.status(400).send("email already registered")
//     } else {

//         await User.create({ name, email, password, institute })
//         return res.status(201).send(" signup successful ")
//     }
// });

module.exports = router