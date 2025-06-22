const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
    },
    lastName: {
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender:{
        type: String,
        enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
        },
    },
    photoUrl: {
        type: String,   
        default:"https://miro.medium.com/v2/resize:fit:1024/1*gQzkQ3uJ0SwJL51t16bivw.jpeg",
        validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      }
    },
    about: {
        type: String,
        default: "Hey there! I am using CodeConnect, a platform to connect with developers and share knowledge."
    },
    skills: {
        type: [String]
    },

},{timestamps: true});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;