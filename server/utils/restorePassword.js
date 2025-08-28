import { config } from "./../config/config.js";
import { transporter } from "../config/nodemailer.js";

async function sendRestorePasswordEmail(email, sessionId, currentDomain) {
  try {
    const restoreLink = `${currentDomain}/auth/restorepassword/${sessionId}`;

    // email options
    const mailOptions = {
      from: config.ADMIN_EMAIL,
      to: email,
      subject: "Restore Your Password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${restoreLink}">${restoreLink}</a>
        <p>If you did not request this, ignore this email.</p>
      `,
    };

    // send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export default sendRestorePasswordEmail;
