const mongoose = require('mongoose')
mongoose.disconnect('mongodb://127.0.0.1:27017/userauth').then(() => { console.log("Sucessfully Connected To DataBase ") }).catch((e) => { console.log("Error Occured") })

