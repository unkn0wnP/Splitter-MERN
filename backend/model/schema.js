const mongoose = require('mongoose')

const user = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    
    username:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    confirmationcode:{
        type: String,
        unique: true
    },

    status:{
        type: String,
        enum: ['Pending','Active'],
        default: 'Pending'
    },

    register_time:{
        type: Date,
        required: true  
    }
})

const friend = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    friends:{
        type: Array
    },

    pending:{
        type: Array
    }
})

const Expense = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },

    friend:{
        type: String,
        required: true,
    },

    amount:{
        type: Number,
        required: true
    },

    date:{
        type: String,
        required: true,
    },

    discription:{
        type: String,
        required: true,
    },

    tID:{
        type: String,
        required: true,
    },

    tDate:{
        type: Date,
        required: true,
    },

    status:{
        type: String,
        required: true
    }
})
module.exports.User = mongoose.model("User",user);
module.exports.Friend = mongoose.model("Friend",friend);
module.exports.Expense = mongoose.model("Expense",Expense);