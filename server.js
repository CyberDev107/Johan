// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, date, time, room } = req.body;

    // Set up nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cybertech107@gmail.com',
            pass: 'argi rhcl ftcg qsen'
        }
    });

    const mailOptions = {
        from: 'cybertech107@gmail.com',
        to: 'voidentertainmentgamedev@gmail.com',
        subject: 'Room Booking Request',
        text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nRoom: ${room}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
