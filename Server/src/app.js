const express = require('express');
const connectDB = require('./config/database'); 
const User = require('./models/User');
const cookieParser = require('cookie-parser'); 
const cors = require("cors")
const http = require('http');


require('dotenv').config();

require("./utils/cronjob");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
    exposedHeaders: ["x-rtb-fingerprint-id"]
}))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const paymentRouter = require('./routes/payment');
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', paymentRouter);
app.use('/', chatRouter);

const server = http.createServer(app);

initializeSocket(server);

connectDB()
    .then(() => {
        console.log("MongoDB connected")
        server.listen(7777 , () => {
        console.log('Server is running on port 7777');
}) ;
    })
    .catch((err) => console.error("MongoDB connection error:", err));

