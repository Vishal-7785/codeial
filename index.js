const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8005;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded());
app.use(cookieParser());
// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));
// set up express router
app.use('/',require('./routes'));
// set up view engine
 app.set('view engine','ejs');
 app.set('views','./views');
 app.use(session({
     name: 'codeial',
     // todo ->change the secret before deployment in production mode
     secret: 'blah something',
     saveUninitialized: false,
     resave: false,
     cookie: {
         maxAge: (1000*60*100)
     }
 }));
 app.use(passport.initialize());
 app.use(passport.session());

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});