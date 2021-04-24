const nodemailer = require('nodemailer');
const createError = require('http-errors');



module.exports = {
    sendMail: (user,token)=>{
        return new Promise((resolve,reject) => {

            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_ID,
                    pass: process.env.MAIL_PWD
                }
            });
              
            let mailDetails = {
                from: 'college-query<viralitt@gmail.com>',
                to: user,
                subject: 'Hello from College-Query',
                text: 'Hello from College-Query',
                html: `<h1>confirm your email address</h1>
                <p>localhost:3000/${token}`
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                } else {
                    const message = 'Email sent successfully'
                    resolve(message)
                }
            });
        })
    }
}
