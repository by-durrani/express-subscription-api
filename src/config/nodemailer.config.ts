import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdurrehmandurrani1215@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});
