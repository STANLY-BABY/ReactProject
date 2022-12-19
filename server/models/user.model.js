const mongoose=require('mongoose')

const User=new mongoose.Schema({
    firstName:{
        type : String,
    },
    lastName:{
        type : String,
    },
    phoneNumber:{
        type : Number,
    },
    email: {
        type : String,
        unique : true,
    },
    password: {
        type : String,
    },
    profile_picture : String
    },
    {
        collection: 'user_data'
    }
)
const model =  mongoose.model('userData',User)

module.exports = model