const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user:"mega.ofertas.siempre@gmail.com",
    pass:"mfgp cyqp pfgt xcjl"
  }
})

const sendMail = (to, subject, html) =>{
  const mailOptions = {
    from: "mega.ofertas.siempre@gmail.com",
    to: to,
    subject: subject,
    html: html
  }

  transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      return console.log(error);
    }
    console.log("Correo enviado " + info.response);
  });
};
module.exports = sendMail;