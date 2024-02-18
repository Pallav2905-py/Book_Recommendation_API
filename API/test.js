// require("./db/connection")
// const Register = require('./models/registers')

// async function main(){
//     const email = "pallav@gmail.com"

//     try {
//         const emailFormDb = await Register.findOne({ email: email });
//         console.log(emailFormDb);
//         console.log(emailFormDb.email)
//         // try {

//         // } catch (error) {

//         // }
//     } catch (error) {
//         res.send("No Such Email Found on DataBase, please SignUp First")
//     }
// }


// main();


// const hashPass = await bcrypt.hash(req.body.password, 12);
// const email = req.body.email
// const LoginToken = false;
// const userData = await Register.findOne({ email: email });
// const conformPass = await bcrypt.compare(req.body.password, userData.hashPass)
// // if ((await userData.email == email) && (await userData.hashPass == hashPass)) {
// //     // const LoginToken = true;
// //     console.log("Done")
// // }

// console.log(userData)
// console.log(email);
// console.log(hashPass)
// console.log(userData.email);
// console.log(userData.hashPass);
// console.log(LoginToken);
// console.log(conformPass);

// res.render("submited.pug")


const jwt = require('jsonwebtoken')
const createToken= async ()=>{
    const token = await jwt.sign({
        _id:"274937492378"
      },"pallavismynamexdxdxdxd")

      const userVar = await jwt.verify(token, "pallavismynamexdxdxdxd")
      console.log(token);
      console.log(userVar);

}
createToken()