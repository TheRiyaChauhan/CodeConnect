const express = require('express');
const connectDB = require('./config/database'); 
const User = require('./models/User');
const cookieParser = require('cookie-parser'); 
const cors = require("cors")


require('dotenv').config();

require("./utils/cronjob");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const paymentRouter = require('./routes/payment');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', paymentRouter);


connectDB()
    .then(() => {
        console.log("MongoDB connected")
        app.listen(7777 , () => {
        console.log('Server is running on port 7777');
}) ;
    })
    .catch((err) => console.error("MongoDB connection error:", err));

