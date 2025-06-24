import nodemailer from "nodemailer";
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6fa10aa59b1e46",
    pass: "b3eb3ef0a4b2a0",
  },
  from: "6fa10aa59b1e46",
});

const mail = async (to, subject, text) => {
  try {
    await transport.sendMail({
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

export default mail;
