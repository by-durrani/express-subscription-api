export const mailTemplate = () => {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Login Code</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif;
            background-color: #0a0a0a;
            color: #ffffff;
            line-height: 1.6;
          }

          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0a0a;
          }

          .email-content {
            padding: 60px 40px;
          }

          .logo {
            margin-bottom: 48px;
          }

          .logo-text {
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
            letter-spacing: -0.02em;
          }

          .logo-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #ff5722;
            border-radius: 50%;
            margin-left: 6px;
            vertical-align: middle;
          }

          h1 {
            font-size: 32px;
            font-weight: 400;
            color: #ffffff;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
          }

          .subtitle {
            font-size: 16px;
            color: #a0a0a0;
            margin-bottom: 48px;
            line-height: 1.5;
          }

          .otp-container {
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            padding: 32px;
            text-align: center;
            margin-bottom: 32px;
          }

          .otp-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #808080;
            margin-bottom: 16px;
          }

          .otp-code {
            font-size: 48px;
            font-weight: 600;
            letter-spacing: 0.2em;
            color: #ffffff;
            font-family: "Courier New", Courier, monospace;
            margin-bottom: 16px;
          }

          .otp-expiry {
            font-size: 14px;
            color: #808080;
          }

          .info-text {
            font-size: 15px;
            color: #a0a0a0;
            margin-bottom: 32px;
            line-height: 1.6;
          }

          .divider {
            height: 1px;
            background-color: #2a2a2a;
            margin: 48px 0;
          }

          .footer {
            font-size: 13px;
            color: #606060;
            line-height: 1.6;
          }

          .footer a {
            color: #ff5722;
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }

          @media only screen and (max-width: 600px) {
            .email-content {
              padding: 40px 24px;
            }

            h1 {
              font-size: 28px;
            }

            .otp-code {
              font-size: 40px;
            }

            .otp-container {
              padding: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-content">
            <!-- Logo -->
            <div class="logo">
              <span class="logo-text">YourApp<span class="logo-dot"></span></span>
            </div>

            <!-- Header -->
            <h1>Your login code</h1>
            <p class="subtitle">
              Use the code below to securely sign in to your account.
            </p>

            <!-- OTP Code Box -->
            <div class="otp-container">
              <div class="otp-label">Verification Code</div>
              <div class="otp-code">847392</div>
              <div class="otp-expiry">Expires in 10 minutes</div>
            </div>

            <!-- Info Text -->
            <p class="info-text">
              If you didn't request this code, you can safely ignore this email.
              Someone else might have typed your email address by mistake.
            </p>

            <!-- Divider -->
            <div class="divider"></div>

            <!-- Footer -->
            <div class="footer">
              <p>
                This is an automated message from YourApp. Please do not reply to
                this email.
              </p>
              <p style="margin-top: 16px">
                Need help? <a href="mailto:support@yourapp.com">Contact support</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
