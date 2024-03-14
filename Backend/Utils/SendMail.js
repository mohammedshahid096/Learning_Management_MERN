const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

module.exports.sendMail = async (emailoptions) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const { email, subject, template, data } = emailoptions;

  const templatePath = path.join(__dirname, "../public/mails/", template);
  const html = await ejs.renderFile(templatePath, data);

  const sendMailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(sendMailOptions);
};
