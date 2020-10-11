const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting to db'));
db.once('open',function(){
    console.log('successfully connected to database');
});
module.exports = db;