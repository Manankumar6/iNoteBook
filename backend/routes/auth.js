const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisiaainotebookappusingreact";
const fetchuser = require('../middleware/fetchuser')


//ROUATE 1:Create a user using : Post "/api/auth/createuser". Doesn't Require auth
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {

  //error for bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check weather tha email exists already
  try {

    // check user is exict with same email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      //   }).then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      // res.json({error:"Please enter a unique value for email", message:err.message})})
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    
    res.json({success:true,authToken})
   
  } catch (error) {
    console.log(error.message)
    res.status(500).send({success:false,error:error.message})
  }

})

//ROUATE 2:Authonticate a user using : Post "/api/auth/login". NO login req.
router.post('/login', [

  body('email', "Enter a vaild email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {
  //error for bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Please login with correct details" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({success, error: "Please enter correct details" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken })
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
  }
})

// ROUATE 3: Get loggedin  user details using:"/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;

    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
  }
})
module.exports = router