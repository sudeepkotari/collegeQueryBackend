const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: "sudeepkotari@gmail.com", // Change to your recipient
//   from: {
//     name: "college-query",
//     email: "viralitt@gmail.com",
//   },
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const nodemailer = require("nodemailer");
// const createError = require("http-errors");

module.exports = {
  sendMail: (user, token) => {
    return new Promise((resolve, reject) => {
      const msg = {
        to: user, // Change to your recipient
        from: {
          name: "college-query",
          email: "viralitt@gmail.com",
        },
        subject: "verification email from College-Query",
        text: "verification email from College-Query",
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

      sgMail
        .send(msg)
        .then(() => {
          const message =
            "A verification link has been sent to your email account";
          resolve(message);
        })
        .catch((error) => {
          reject(
            createError.InternalServerError(
              "gmail service not working try after some time"
            )
          );
        });
    });
  },
};
