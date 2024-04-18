const express = require("express");
const jwt = require('jsonwebtoken');
const {Admin ,Courses} = require('../Db');
const {AuthenticateJwt,Secret} = require('../Middleware');
const router = express.Router();

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({username,password});
    if(admin)
    {
        const token = jwt.sign({username, role:"Admin"},Secret,{expiresIn : "1h"})
        res.status(200).json({message:"Admin Sign in successfullt",token});
    }
    else{
        res.status(403).json({message:"Incorrect username or password"});
    }
})

router.post('/signup',async(req,res)=>{
    const {username,password} = req.body;
    const admin =await Admin.findOne({username,password});
    if(admin)
    {
        res.json("Admin already exists");
    }
    else{
        const obj = {username,password};
        const newAdmin = new Admin(obj);
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, Secret, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
})
router.get("/me", AuthenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});

router.get('/allcourses',AuthenticateJwt, async(req,res)=>{
    const courses = await Courses.find({});
    res.json({
        courses
    })
})

router.post('/addcourses',AuthenticateJwt, async(req,res)=>{
    const { title, description, price, image } = req.body;
    try {
        const newCourse = new Courses({ title, description, price, image });
        await newCourse.save();
        res.status(200).json({ message: "Course created successfully" });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


module.exports = router