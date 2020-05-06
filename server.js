const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); // for parsing the formdata
const app = express();
require('dotenv').config();

app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

var mailOptions = {
    from: "geoolson@pdx.edu",
    to: "geoolson@pdx.edu",
    subject: "message from portfolio site",
};


app.post('/sendmessage', upload.none(), (req, res) => {
    mailOptions.cc = req.body.email;
    mailOptions.text = req.body.message;
    transporter.sendMail(mailOptions)
        .then(response => res.end('{"message": "success"}'))
        .catch(error => res.end(`{"error": "${error}"}`));
});

const server = app.listen(8080, () => console.log(`listening on port ${server.address().port}`));

