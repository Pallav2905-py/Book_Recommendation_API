const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const RegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    hashPass: String,

    //? Yai rule hi hai!!
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const BookSchema = new mongoose.Schema({
    bookCover: String,
    title: String,
    author: String,
    genre: String,
    publicationDate: String,
    desc:String,
})



//! Use Methods to deal with Instance.. {registerData(Which is a Document), in server.js is an instance of Model Register}
RegisterSchema.methods.generateAuthToken = async function () {
    try {
        const token0 = jwt.sign({ _id: this._id.toString() }, "mynameispallav")
        this.tokens = this.tokens.concat({token:token0})
        await this.save();
        return token0;
        // console.log(token0);
    } catch (error) {
        res.send(400);
    }
}

const Register = new mongoose.model('Register', RegisterSchema);
const Book = new mongoose.model('Book', BookSchema);
module.exports = Register,Book;
