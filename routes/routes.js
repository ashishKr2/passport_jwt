const express=require('express');
const router=express.Router();
var passport = require('passport');
var jwt=require('jsonwebtoken');
var User=require('../models/user');
var config=require('../config/database');
//  message area
var Message=require('../models/message');

router.get('/messages',(req,res,next)=>{
    Message.find(function(err,messages){
        res.json(messages);
    })
});

// router.get('/messages/:username',(req,res,next)=>{
//     Message.getByUsername(req.params.username)
//     .then(messageFound=>{
//         return res.status(200).json(messageFound);
//     })
// });

router.post('/message',(req,res,next)=>{
    let newMsg=new Message({
        msg:req.body.msg,
        username:req.body.username
    });
    // if(username.){
        newMsg.save((err,message)=>{
            if(err){
                res.json({msg: 'Failes to send message'});
            }
            else{
                res.json({msg: 'Message sent successfully'});
            }
        });
   //}
    
});

router.delete('/message/:id',(req,res,next)=>{
    Message.remove({_id:req.params.id},function(err,result){
if(err){
    res.json(err);
      }
else{
res.json(result);
}
});
});

// ******************************************************
var token;
    router.post('/signup',function(req,res){
        var newUser=new User({
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            contact_no:req.body.contact_no,
            age:req.body.age,
            gender:req.body.gender,
            password:req.body.password,
        });
        User.createUser(newUser,function(err,user){
            if(err){
                res.json({success:false,message:'useer is not registered'});
            }
            else{
                res.json({success:true,message:'user success'});
            }
        });
    });
    router.post('/login',function(req,res){
        var email=req.body.email;
        var password=req.body.password;
        
        User.getUserByEmail(email,function(err,user){
             if(err) throw err;
            if(!user){
                return res.json({success:false,message:'no user found'});
            }
            User.comparePassword(password,user.password,function(err,isMatch){
                if(err) throw err;
                if(isMatch){
                     token= jwt.sign(user.toJSON(),config.secret,{expiresIn:600000});
                    res.json({success:true,token:'JWT '+token,
                    user:{
                        id:user._id,
                        username:user.username,
                        email:user.email,
                        password:user.password,
                        name:user.name,
                        contact_no:user.contact_no,
                        age:user.age,
                        gender:user.gender,
                        role:user.role
                    }});
                }else{
                    return res.json({success:false,message:'password not match'});
                }
            });
        });
    });

    router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res,next){
        res.json({user:req.user});
    });
    router.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
       
    });

module.exports=router;