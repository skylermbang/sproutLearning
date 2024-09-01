const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sanitize = require('sanitize-html');
const moment = require('moment');
const app = express();
require('moment-timezone');
const port = process.env.PORT || 5002; // 5002


app.use(cors());
app.use(express.json());



//mongodb schemas and connect
const mongoose = require("mongoose");
const connect = require("./schemas");
connect();



// rss-parser
const Parser = require("rss-parser")
const parser = new Parser()


//routers 
const indexRouter = require("./router/index")
const userRouter = require("./router/users")
 

app.use('/api',indexRouter)
app.use('/api/users', userRouter)



app.listen(port, () => {
    console.log(`
        🚀  Server is up and running! 
        🌎  Visit: http://localhost:${port}
        🎉  Sprout Learning Backend API Server
        `);
    
});