'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app        = express();
const PORT       = process.env.PORT || 3009;
const hashedPass = require('./password').password;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/submit', (req,res) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, //465 587
    secure: true,
    auth: {
      user: 'tsaknowris@gmail.com',
      pass: hashedPass
     }
   });

  let mailOptions = {
    from: '"Chuck Noris 👻" <tsaknowris@gmail.com>',
    to: req.body.data.map(item=>item.email).join(', '),
    subject: 'Greetings from Chuck ✔',
    html: `<b>${req.body.joke}</b>`
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
})

app.listen(PORT, () => {
  console.log('...live...')
});
