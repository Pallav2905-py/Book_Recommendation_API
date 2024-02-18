const bcrypt = require("bcrypt")
const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth")

require("./db/connection")
const Register = require('./models/registers')
const Book = require("./models/registers")
const Review = require("./models/review")

//*Express Specific Stuff: 
app.use('/static', express.static('static'))  //! For Sering Static Folder
app.use(express.urlencoded({ extended: true })) //!form ka data lane ke liye!
app.use(express.json());
app.use(cookieParser());

app.get('/secret',auth,(req,res)=>{
    res.render('secret')
})

app.get('/logout',auth,async(req,res)=>{
    try {
        res.clearCookie('jwt');
        console.log("Log Out Sucessfully")
        console.log(req.user)
        console.log
        //! Filter method creats a new array of elements which pass the condition!
        req.user.tokens = req.user.tokens.filter((currElement)=>{
            return currElement.token != req.token
        })

        await req.user.save()
        res.render('home')

    } catch (error) {
        res.status(500).send(error);
    }
})

//?Creating a New User
app.post('/createUser', async (req, res) => {
    try {
        const hashPass = await bcrypt.hash(req.query.password, 12);
        const registerData = new Register({ name: req.query.name, email: req.query.email, number: req.query.number, hashPass: hashPass });
        const token = await registerData.generateAuthToken(); //? Calling The function 'generateAuthToken' from registers.js
        console.log(token)
        res.cookie('jwt', token, {  //? To Set Cookie
            httpOnly: true //? Client can't manipulate cookie
        })
        console.log(req.cookie)
        console.log(` This is web token ${req.cookies.jwt}`) //? To get Cookie
        await registerData.save()
        res.status(200).json("User Created Sucessfully!")
    } catch (error) {
        res.status(400).send(error)
    }
})


//? Loiging in
app.post('/login', async (req, res) => {
    const email = req.query.email
    try {
        const userData = await Register.findOne({ email: email });
        const confirmPass = await bcrypt.compare(req.body.password, userData.hashPass)
        const token = await userData.generateAuthToken(); //? since, not userData is the instance of Method Register, Calling The function 'generateAuthToken' from registers.js

        res.cookie('jwt', token, {
            httpOnly: true //? Client can't manipulate cookie
        })

        // console.log(req.cookie('jwt@L'))
        if ((userData.email == email) && (confirmPass == true)) {

            res.render("loggedIn.pug")
        }
        else {
            res.end("Incorrect Password")
        }
    } catch (error) {
        res.sendStatus(400)
        console.log("Wrong Email")
    }

})

app.post("/search", async (req, res) => {
    
    //?The above two lines are just in case any one field out of atlest 2 don't exist but 1 atleast Should.
    //!Inshort Making API better!
    //!Matlab ek property ko priority de diye hai, baki property ignoreee!!
    const { title, author, genre } = req.query;
    const queryObj = {};
    if (title) {
        queryObj.userId = userId;
    }
    if (author) {
        queryObj.completed = completed;
    }
    if (genre) {
        queryObj.title = { $regex: title, $options: "i" }
    }

    if (select) {
        var selectFix = select.split(",").join(" ");
        // const apiData = await Product.find(queryObj).select(selectFix);
    }
    const apiData = await Book.find(queryObj);
    
    let page = Number(req.query.page) || 1; //?By default 1(ONE).
    let limit = Number(req.query.limit) || 3;

    let skip = (page-1)*limit;
    const myData = await Book.find(queryObj).select(selectFix).skip(skip).limit(limit);
    console.log(queryObj)
    res.status(200).json({ myData })

})
app.post("/rate", async (req, res) => {

    const userRate = new Review({stars: req.query.stars, review:req.query.review})
    await userRate.save()

    res.status(200).json({ userRate })

})

app.get("/reviews",async(req,res)=>{
    const reviewData = await Review.find();
    res.status(200).send(reviewData)
})

app.listen(5000, () => {
    console.log(`Example app listening on port 5000`)
})


