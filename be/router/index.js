const express = require("express")
const router = express.Router()


router.get('/', (req, res) => {
    console.log('Received a GET request on /api');
    res.send('Hello from the backend!');
});


module.exports = router