import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  verificationEmailHTML,
  forgotPasswordEmailHTML,
  resetSuccessEmailHTML,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: "Verify your email",
      html: verificationEmailHTML.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      template_uuid: "93de8fd9-1fb6-41ef-b08a-07889d357876",
      template_variables: {
        name: name,
        company_info_name: "Cuong Company",
      },
    });
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: "Reset your Password",
      html: forgotPasswordEmailHTML.replace("{resetUrl}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error("Error sending forgot password email", error);
    throw new Error(`Error sending forgot password email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: "Reset Password Successfully",
      html: resetSuccessEmailHTML,
      category: "Password Reset Successfully",
    });
  } catch (error) {
    console.error("Error reset password email", error);
    throw new Error(`Error reset password email: ${error}`);
  }
};
