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

const sendConfirmationEmail = async (to, token) => {
  const confirmLink = `${process.env.BASE_URL}/api/auth/confirm/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Подтверждение регистрации',
    html: `
      <p>Пожалуйста, подтвердите свою регистрацию, перейдя по ссылке:</p>
      <a href="${confirmLink}">${confirmLink}</a>
      <p>Если вы не регистрировались, проигнорируйте это письмо.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.response);
  } catch (error) {
    console.error('Ошибка отправки:', error);
  }
};

// Пример вызова функции
const token = 'exampleToken'; // Замените на ваш токен
sendConfirmationEmail('kristinarwebdev@gmail.com', token);
