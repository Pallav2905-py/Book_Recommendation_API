const jwt = require('jsonwebtoken');
const Register = require("../models/registers");


const auth = async (req, res, next) => {
    //? next parameter is important function ke bahar nikal ne ke liye
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "mynameispallav");

        console.log(verifyUser);

        const user = await Register.findOne({_id:verifyUser._id})
        console.log(user)
        //! next call nai karoge to iss function ke bahar jaa hi nai payega!!

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;