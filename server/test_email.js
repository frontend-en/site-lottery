require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'kristinarwebdev@gmail.com', // Ваш email для проверки
  subject: 'Тестовое письмо',
  text: 'Это тестовое письмо для проверки работы Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Ошибка отправки:', error);
  } else {
    console.log('Письмо отправлено:', info.response);
  }
});
