var express= require('express'),
 bodyParser=require('body-parser'),
 app=express();
 var  morgan=require('morgan');
 var mongoose=require('mongoose');
 var cors=require('cors');
 var passport=require('passport');
 var config=require('./config/database');
 var port=process.env.PORT || 3000;
 var path =require('path');
 const route=require('./routes/routes');
 mongoose.connect('mongodb://localhost:27017/users',{useNewUrlParser: true});//connect to mongodb
 mongoose.connection.on('connected',()=>{
     console.log('connected to database mongodb 27017');
 });
 mongoose.connection.on('error',(err)=>{
     if(err){
 console.log('error in database'+err);
     }
 });
 
mongoose.Promise=global.Promise;

 require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


// app.use(express.static(path.join(__dirname,'public')));
app.use('/',route);
app.get('/',(req,res)=>{
    res.send("Hello welcome to ..........");
    });
app.listen(port,function(){
    console.log('server is running on port no'+port);
})