const mongoose=require('mongoose');

const MessageSchema=mongoose.Schema({
    msg:{
        type:String,
        required:true
    }
});
const Message=module.exports=mongoose.model('message',MessageSchema);