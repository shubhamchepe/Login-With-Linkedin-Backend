var User = require('../models/User.model');

//Creating User
const createUser = (req,res) => {
    var newUser = new User();

    newUser.firstname =  req.body.firstname;
    newUser.lastname =  req.body.lastname;
    newUser.username =  req.body.username;
    newUser.mobileNumber = req.body.mobileNumber;
    newUser.email =   req.body.email;
    newUser.password =   req.body.password;



    newUser.save((err,newUser)=>{
       if(err){
           console.log(err);
           res.send('Could not create user')
       } else{
           console.log('User Created Successfully');
           res.json(newUser);
       }
    })
};

module.exports = {createUser};