const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require('./Routes/AdminRoutes');

const app =express();
app.use(cors());
app.use(express.json());

app.use('/admin',adminRoutes);


mongoose.connect("mongodb+srv://fshakeel9233:MrMSvv9kCv2wyO9H@cluster0.zuaiorv.mongodb.net/CourseApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected");
    }).catch(error => {
        console.error("Error connecting to database:", error);
    });

app.listen(3000, ()=>{
    console.log("Server running on 3000");
})

