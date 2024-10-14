const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://walisantunu:WkNefBVfgtFPVYDD@cluster0.8cpsi.mongodb.net/card-making-app").then(() => console.log('db connected'));

const adminSchema = mongoose.Schema({
    username: String,
    password: String
})

const cardSchema = mongoose.Schema({
    name: String,
    description: String,
    linkedin: String,
    twitter: String,
    interests: String
})

const Card = mongoose.model("Card", cardSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {Card, Admin};