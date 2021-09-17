const nodemailer = require("nodemailer");
const createError = require("http-errors");

module.exports = {
  sendMail: (user, token) => {
    return new Promise((resolve, reject) => {
      let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PWD,
        },
      });

      let mailDetails = {
        from: "college-query<viralitt@gmail.com>",
        to: user,
        subject: "Hello from College-Query",
        text: "Hello from College-Query",
        html: `<!DOCTYPEhtml>
                <htm>
                        <head>
                        <style type="text/css">
                            .btn {
                                background-color:#3182CE;
                                cursor:pointer;
                                border-radius: 10px;
                                height:50px;
                                width:150px;
                                color:#fff;
                                border:none;
                                font-size: 20px;
                                font-weight: bold;
                            }
                        </style>
                        </head>
                        <body>
                        <h1 style="text-align:center;">verify your email address</h1>
                        <div style="text-align:center;">
                        <a href='https://college-query.web.app/verify-mail/${token}'>
                            <button class="btn">
                                Confirm email
                            </button>
                        </a>
                        </div>
                        </body>
                        </html>`,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err.message);
          reject(
            createError.InternalServerError(
              "gmail service not working try after some time"
            )
          );
          return;
        } else {
          const message =
            "A verification link has been sent to your email account";
          resolve(message);
        }
      });
    });
  },
};
