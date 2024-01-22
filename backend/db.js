const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/iNoteBook').then(()=>{
    console.log('Connect successfully')
})
.catch((err)=>{
    console.log("Connection failed")
})

module.exports = mongoose