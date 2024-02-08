const {Router} = require('express');
const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const authInputMiddleware = require('../middlewares/authInput')


const router = Router();

router.post('/signup',authInputMiddleware, async(req, res) => {
    const {email, username, password} = req.body;
    const isExist = await User.findOne({email});
    if(!isExist){
        const hashPassword = bcrypt.hashSync(password);
        await User.create({
            email,
            username,
            password: hashPassword,
        })
        res.json({
            message: 'User created successfully',
        })
    }
    else{
        res.status(400).json({
            message: 'Email already exists'
        })
    }
})

router.post('/signin',authInputMiddleware, async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400).json({
            message: 'Please sign up first',
        })
        return;
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if(!isPasswordCorrect){
        res.status(400).json({
            message: 'Incorrect password',
        })
        return;
    }
    const token = jwt.sign({email},JWT_SECRET);
    res.json({
        token: 'Bearer ' + token,
    })
})

module.exports = router;
