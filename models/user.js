var mongoose=require('mongoose');
 var config=require('../config/database');
var bcrypt =require('bcryptjs');
var userSchema=mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique:true
    },
    email: {
        required: true,
        type: String,
        unique:true,
    },
    contact_no: {
        required: true,
        type: Number,
        minlength: 10,
        maxlength: 10
    },
    age: {
        required: true,
        type: Number,
        min: 15,
        max: 65
    },
    gender:
    {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});
var User=module.exports=mongoose.model('User',userSchema);

module.exports.getUserById=function(id,cb){
    User.findById(id,cb);
}

module.exports.getUserByEmail=function(email,cb){
    User.findOne({email:email},cb);
}

module.exports.createUser=function(newUser,cb){
    bcrypt.genSalt(10,function(err,salt){
       //password with incrypted hash value
        bcrypt.hash(newUser.password,salt,function(err,hash){
            if(err) throw err;
            newUser.password=hash;
            newUser.save(cb);    
        })
    })
}

module.exports.comparePassword=function(myPassword,hash,cb){
    bcrypt.compare(myPassword,hash,function(err,isMatch){
        if(err) throw err;
        cb(null,isMatch)
    });
}