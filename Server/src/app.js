const express = require('express');
const connectDB = require('./config/database'); 
const User = require('./models/User');
const { validateSignUpData } = require('./utils/validator'); 
const bcrypt = require('bcrypt'); 
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken'); 
const userAuth = require('./middlewares/auth');   

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.post('/signup', async (req, res) => {
   
    try{
        // Validate request data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword, // Store the hashed password 
        })
        await user.save();
        res.status(201).send("User created successfully");
    }
    catch(err){
        return res.status(500).send("Error" + err.message);
    }
});

app.post('/login', async (req, res) => {
    
    try {
        const { emailId, password } = req.body;
        // Find user by email
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(404).send("Invalid credentials");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            // Create JWT token
            const token = jwt.sign({ _id : user._id }, 'your_jwt_secret', { expiresIn: '1d' });

            // Set token in cookie
            res.cookie('token', token)
            res.send(user);
        }
        else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        return res.status(500).send("Error logging in: " + err.message);
    }
})

app.get('/profile/view', userAuth, async (req, res) => {
    try{
        const user = req.user; // User is set by the userAuth middleware
       
        res.status(200).send(user);
    }catch(err){
        return res.status(500).send("Error fetching profile: " + err.message);
    }
})

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

app.get('/feed', async(req,res)=>{
    try{
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).send("No users found");
        }
        res.status(200).send(users);
    }catch(err){
        return res.status(400).send("Error fetching users: " + err.message);
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

