const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const {
  NODEMAILER_SERVICE,
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_PASS,
  NODEMAILER_USER,
} = require("../Config/index");
const logger = require("../Config/applogger.config");

module.exports.sendMail = async (emailoptions) => {
  const transporter = nodemailer.createTransport({
    service: NODEMAILER_SERVICE,
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  const { email, subject, template, data } = emailoptions;
  const templatePath = path.join(__dirname, "../../public/mails/", template);

  const html = await ejs.renderFile(templatePath, data);

  const sendMailOptions = {
    from: NODEMAILER_USER,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(sendMailOptions);
  // logger.debug("mail message response", response);
};
