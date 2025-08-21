const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const { validateSignUpData } = require('../utils/validator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const e = require('express');
const sendMail = require('../utils/sendEmail');
const getWelcomeEmailHTML  = require('../utils/htmlTemplate');


const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
   
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
          const savedUser = await user.save();
   const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("token", token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', 
        // sameSite:'None',
      expires: new Date(Date.now() + 8 * 3600000),
    });
    
    sendMail(emailId, "Welcome to CodeConnect", `Hello ${firstName}, Thankyou for registering on CodeConnect!`, getWelcomeEmailHTML(firstName));
    res.json({ message: "User Added successfully!", data: savedUser });
    }
    catch(err){
        return res.status(500).send("Error" + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    
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
            const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            // Set token in cookie
            res.cookie("token", token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', 
        // sameSite:'None',
      expires: new Date(Date.now() + 8 * 3600000),
    });
            res.send(user);
        }
        else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        return res.status(500).send("Error logging in: " + err.message);
    }
})

authRouter.post('/logout', (req, res) => {
    try{
        res.cookie("token", null, {expires: new Date(Date.now())}); // Clear the token cookie
        res.status(200).send("User Logged out successfully");
    }catch(err){
        return res.status(500).send("Error logging out: " + err.message);
    }
})


module.exports = authRouter;
