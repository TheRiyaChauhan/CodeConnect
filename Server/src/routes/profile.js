const express = require('express');
const userAuth = require('../middlewares/auth'); 
const User = require('../models/User'); 

const profileRouter = express.Router();


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try{
        const user = req.user; // User is set by the userAuth middleware
       
        res.status(200).send(user);
    }catch(err){
        return res.status(500).send("Error fetching profile: " + err.message);
    }
})

module.exports = profileRouter;
