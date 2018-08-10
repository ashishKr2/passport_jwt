const mongoose=require('mongoose');
var config=require('../config/database');
var bcrypt =require('bcryptjs');
const MessageSchema=mongoose.Schema({
    msg:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
        
    }
});
const Message=module.exports=mongoose.model('message',MessageSchema);

module.exports.getByUsername=function(username){
    console.log('user name.............',username);
    return Message.find({username})
}