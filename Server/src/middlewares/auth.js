const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;

        if(!token){
            res.status(401).send("Please Login !")
        }

        const decodeObject =await jwt.verify(token, process.env.JWT_SECRET);

        const {_id} = decodeObject;

        const user = await User.findOne({_id});

        if(!user){
           throw new Error("User not found");
        }

        req.user = user;

        next();

    }
    catch(err){
        res.status(401).send("Unauthorized: " + err.message);
    }
}

module.exports = userAuth;