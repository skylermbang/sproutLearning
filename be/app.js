const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Add cookie-parser
const router = express.Router();
const app = express();
const port = process.env.PORT || 5002; // Use 5002

require('dotenv').config();


console.log("Environment:", process.env.NODE_ENV);

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.PROD_FRONTEND_URL
    : process.env.DEV_FRONTEND_URL,
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle preflight requests for all routes

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser to read cookies

// Connect to MongoDB and other configs
const mongoose = require("mongoose");
const connect = require("./schemas");
connect();

// Routers
const indexRouter = require("./router/index");
const userRouter = require("./router/users");
const classRouter = require("./router/class");
const enrollmentRouter = require("./router/enrollment")

app.use('/api', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/classes', classRouter)
app.use('/api/enrollments', enrollmentRouter)

// Start the server
app.listen(port, () => {
  console.log(`
    🚀  Server is up and running! 
    🌎  Visit: http://localhost:${port}
    🎉  Sprout Learning Backend API Server
  `);
});
