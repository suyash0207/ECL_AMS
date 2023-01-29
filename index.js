const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// const data = require('./config/Employedb');
const Employee=require('./models/emaster');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');



app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/images', express.static('./assets/images'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

// app.post('/create-master', function(req, res){
     
//     Employee.create({
//          //passing value
//         name: req.body.name,
//         phone: req.body.phone
//     }, function(err, newContact){
//         if(err){console.log('Error in creating a master!')
//             return;}
//             console.log('******', newContact);
//             return res.redirect('back');
//     })

// });
app.post('/master-data', function(req,res){
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email =req.body.email;
    var Area_code = req.body.Area_code;
    var address=req.body.address;
    var phone =req.body.phone;
    var designation =req.body.designation;
    var department =req.body.department;
    
  
    var data = {
        "first_name": first_name,
        "last_name": last_name,
        "email":email,
        "Area_code":Area_code,
        "address":address,
        "phone":phone,
        "designation":designation,
        "department":department
        
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('back');
});


app.post('/master-asset_software', function(req,res){
    
    var type =req.body.type;
    var license =req.body.license;
    var serial=req.body.serial;
    var lot=req.body.lot;
    var serial_hq=req.body.serial_hq;
    
    
  
    var data = {
        
        "type":type,
        "serial":serial,
        "serial_hq":serial_hq,
        "lot":lot,
        "license":license
        
    }
db.collection('assets_software').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
       
    return res.redirect('back');
});


app.post('/master-asset_hardware', function(req,res){
    var type_h=req.body.type_h;
    var license_h=req.body.license_h;
    var serial_h=req.body.serial_h;
    var lot_h=req.body.lot_h;
    var serial_hq_h=req.body.serial_hq_h;
    
  
    var data = {
        "type_h":req.body.type_h,
        "license_h":req.body.license_h,
        "serial_h":req.body.serial_h,
        "lot_h":req.body.lot_h,
        "serial_hq_h":req.body.serial_hq_h
        
    }
db.collection('assets_hardware').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('back');
});
  
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});


