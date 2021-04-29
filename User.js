const mongoose = require('mongoose');


//schema for database
var drinkSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            unique: true, 
            required: true, 
            maxLength: 255 },
        password: {
            type: String,
            unique: false,
            required: true,
            maxLength: 1024 },
        // drinks: [{}]
    }
);


module.exports = mongoose.model('User', drinkSchema);