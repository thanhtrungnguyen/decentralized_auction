import mailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (to, subject, htmlContent) => {
  const transport = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  const result = await transport.sendMail(options);
  console.log("email sent...", result);
  return result;
};
