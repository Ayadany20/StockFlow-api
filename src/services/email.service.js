import nodemailer from 'nodemailer';
import serverConfig from '../config/server.config.js';

const transporter = nodemailer.createTransport({
  service: serverConfig.email.service,
  auth: {
    user: serverConfig.email.user,
    pass: serverConfig.email.pass
  }
});

// Función para enviar correo
export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: serverConfig.email.from,
      to,
      subject,
      html
    });
    console.log(`Correo enviado a ${to}`);
  } catch (err) {
    console.error('Error enviando correo:', err.message);
  }
};
