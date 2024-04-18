const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: String,
    password: String
});

const coursesSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String
});

const Admin = mongoose.model("Admin",adminSchema);
const Courses = mongoose.model("Courses",coursesSchema);

module.exports = {
    Admin,
    Courses
}