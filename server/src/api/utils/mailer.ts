import nodemailer, { SendMailOptions } from 'nodemailer';
import { config } from '../../config/custom-environment-variables';
import logger from './logger';

const smtp = config.smtp;

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass
  }
});

const sendEmail = (mailOptions: SendMailOptions) => {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(err, 'Error sending email');
      return;
    }
    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
};

export default sendEmail;
