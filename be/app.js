const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 5002; // 5002


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const exampleSchema = new mongoose.Schema({
    name: String,
    message: String,
});

const Example = mongoose.model('Example', exampleSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

const SECRET_KEY = 'your_secret_key'; // Replace with a secure secret key



app.get('/api', (req, res) => {
    console.log('Received a GET request on /api');
    res.send('Hello from the backend!');
});

app.post('/api/save', (req, res) => {
    console.log('Received a POST request on /api/save');
    const newExample = new Example({
        name: req.body.name,
        message: req.body.message,
    });

    newExample.save((err, example) => {
        if (err) {
            console.error('Error saving to MongoDB', err);
            return res.status(500).send(err);
        }
        console.log('Saved to MongoDB:', example);
        return res.status(200).send(example);
    });
});

// New login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId;
        next();
    });
}

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});