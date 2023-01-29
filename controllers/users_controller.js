const Employee = require('../models/emaster');
const User = require('../models/user');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "ECL | Sign in"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "ECL | Sign In"
    })
}
// // render the payement page
module.exports.dashboard = function(req, res){

    return res.render('dashboard', {
        title: "BIT Mesra| Payement gateway"
    })
}
// // render the contact page
module.exports.employee_master = function(req, res){

    return res.render('employee_master', {
        title: "ECL| Software Solutions"
    })
}
// render the application page
module.exports.index = function(req, res){

    return res.render('index', {
        title: "index"
    })
}

// render the documents page
module.exports.navigation = function(req, res){

    return res.render('navigation', {
        title: "BIT Mesra| Application form"
    })
}

//add
module.exports.add = function(req, res){

    return res.render('add', {
        title: "ECL| Software Solutions"
    })
}
//software
module.exports.software = function(req, res){

    return res.render('software', {
        title: "ECL| Software Solutions"
    })
}
//hardware
module.exports.hardware = function(req, res){

    return res.render('hardware', {
        title: "ECL| Software Solutions"
    })
}
module.exports.HS = function(req, res){

    return res.render('HS', {
        title: "ECL| Software Solutions"
    })
}
module.exports.Asset_Info = function(req, res){

    return res.render('Asset_Info', {
        title: "ECL| Software Solutions"
    })
}
// module.exports.index = function(req, res){

//     return res.render('index', {
//         title: "ECL| Software Solutions"
//     })
// }


  
// module.exports.alumni = function(req, res){

//     return res.render('alumni', {
//         title: "BIT Mesra| Application form"
//     })
// }
// module.exports.placement = function(req, res){

//     return res.render('placement', {
//         title: "BIT Mesra| Application form"
//     })
// }
// module.exports.scholarship = function(req, res){

//     return res.render('scholarship', {
//         title: "BIT Mesra| Application form"
//     })
// }
// module.exports.semester = function(req, res){

//     return res.render('semester', {
//         title: "BIT Mesra| Application form"
//     })
// }
// module.exports.fees = function(req, res){

//     return res.render('fees', {
//         title: "BIT Mesra| Application form"
//     })
// }

// module.exports.loans = function(req, res){

//     return res.render('loans', {
//         title: "BIT Mesra| Application form"
//     })
// }

// module.exports.infrastructure = function(req, res){

//     return res.render('infrastructure', {
//         title: "BIT Mesra| Application form"
//     })
// }

// module.exports.refund = function(req, res){

//     return res.render('refund', {
//         title: "BIT Mesra| Application form"
//     })
// }
// module.exports.prospectus = function(req, res){

//     return res.render('prospectus', {
//         title: "BIT Mesra| Application form"
//     })
// }
// module.exports.merit = function(req, res){

//     return res.render('merit', {
//         title: "BIT Mesra| Application form"
//     })
// }









//Notification

module.exports.applicationN = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Adhar Number do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'Application Submitted Succesfull Succesfull!');
            return res.redirect('back');
        }

    });
}

// get the payement data
module.exports.fill = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Account Number do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'Payement Succesfull!');
            return res.redirect('back');
        }

    });
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}
//
// https://www.jenniferbland.com/saving-data-to-mongodb-database-from-node-js-application-tutorial

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(req.User,err => {
        req.flash('error', err); 
        req.flash('success', 'You have logged out successfuly!');
        return res.redirect("/")});
    

}