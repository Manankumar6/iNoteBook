const mongoose = require('mongoose');
const URL = process.env.URL
mongoose.connect(URL).then(()=>{
    console.log('Connect successfully')
})
.catch((err)=>{
    console.log("Connection failed")
})

module.exports = mongoose