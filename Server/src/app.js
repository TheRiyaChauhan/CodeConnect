const express = require('express');
const connectDB = require('./config/database'); 
const User = require('./models/User');
const cookieParser = require('cookie-parser'); 
 

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);




// get user by email
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) { 
            return res.status(404).send("User not found");
        }
        else {
            res.status(200).send(user);
        }
    } catch (err) {
        return res.status(400).send("Error fetching user: " + err.message);
    }
})






connectDB()
    .then(() => {
        console.log("MongoDB connected")
        app.listen(7777 , () => {
        console.log('Server is running on port 7777');
}) ;
    })
    .catch((err) => console.error("MongoDB connection error:", err));

