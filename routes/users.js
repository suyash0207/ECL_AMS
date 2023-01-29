const express = require('express');
const router = express.Router();
const passport = require('passport');
// const app = express();

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/dashboard', usersController.dashboard);
router.get('/employee_master', usersController.employee_master);
router.get('/index', usersController.index);
router.get('/navigation', usersController.navigation);
router.get('/add', usersController.add);
router.get('/software', usersController.software);
router.get('/hardware', usersController.hardware);
router.get('/Asset_Info', usersController.Asset_Info);
// router.get('/index', usersController.index);


// router.get('/HS', usersController.HS);
// router.get('/alumni', usersController.alumni);
// router.get('/placement', usersController.placement);
// router.get('/scholarship', usersController.scholarship);
// router.get('/semester', usersController.semester);
// router.get('/fees', usersController.fees);
// router.get('/loans', usersController.loans);
// router.get('/infrastructure', usersController.infrastructure);
// router.get('/refund', usersController.refund);
// router.get('/prospectus', usersController.prospectus);
// router.get('/merit', usersController.merit);


//Noty
router.post('/create', usersController.create);
router.post('/fill', usersController.fill);
router.post('/applicationN', usersController.applicationN);



// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);





router.get('/sign-out', usersController.destroySession);

module.exports = router;