const express = require('express');
const userAuth = require('../middlewares/auth'); 
const User = require('../models/User'); 
const { validateEditProfileData } = require('../utils/validator'); 

const profileRouter = express.Router();


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try{
        const user = req.user; // User is set by the userAuth middleware
       
        res.status(200).send(user);
    }catch(err){
        return res.status(500).send("Error fetching profile: " + err.message);
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)) {
            return res.status(400).send("Invalid fields for profile edit");
        }

        const loggedInUser = req.user; // User is set by the userAuth middleware

        Object.keys(req.body).forEach((key)=>{ loggedInUser[key] = req.body[key] });

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName} Profile updated successfully`,
            data: loggedInUser
        });

    }
    catch(err){
        return res.status(500).send("Error updating profile: " + err.message);
    }
})

module.exports = profileRouter;
