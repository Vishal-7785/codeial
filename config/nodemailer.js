const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'vishaljai7785',
        pass: 'Vishal@123'
    }
});
//email password is correct ? yes

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template'); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}

/// OP or bhaiya aapka react course bhi tha kya?