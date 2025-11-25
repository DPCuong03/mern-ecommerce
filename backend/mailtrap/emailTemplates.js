// backend/utils/emailTemplate.js

export const verificationEmailHTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:24px; border:1px solid #ddd;">
      <h1 style="color:#333;">Thank you for signing up! Your verification code is: </h1>
      <p style="text-align:center; margin:30px 0;">
        <a href="#" style="background:#4CAF50; color:#fff; padding:12px 24px; text-decoration:none; border-radius:5px;">{verificationCode}</a>
      </p>
      <p>This link will expire in 24 hours. If you didn’t sign up, please ignore this email.</p>
    </div>
  </body>
</html>
`;

export const forgotPasswordEmailHTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Password Assistance</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:24px; border:1px solid #ddd;">
      <h2 style="color:#333;">Password Assistance</h2>
      <p>We received a request to reset your account password. If this was you, please use the reset link we sent below.</p>
      <p>{resetUrl}</p>
      <p>If you did not request this change, you can ignore this email — your account is still secure.</p>
    </div>
  </body>
</html>
`;

export const resetSuccessEmailHTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Password Reset Successful</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:24px; border:1px solid #ddd;">
      <h2 style="color:#333;">Password Reset Successful</h2>
      <p>Your password has been changed successfully. You can now log in with your new password.</p>

      <p>If you did not make this change, please contact our support team immediately to secure your account.</p>

      <hr style="margin:24px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:14px; color:#666;">
        Thank you,<br/>
        The Support Team
      </p>
    </div>
  </body>
</html>
`;
