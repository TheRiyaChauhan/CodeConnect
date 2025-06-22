const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://hiriyachauhan123:1AzkTuwH0tqP7IFA@codeconnect.dh377ba.mongodb.net/CodeConnect"
    )
};

module.exports = connectDB;

