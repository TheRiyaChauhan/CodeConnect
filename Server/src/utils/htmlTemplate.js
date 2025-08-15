const getWelcomeEmailHTML = (username) => {
    return(
         `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      background-color: #ffffff;
      margin: 20px auto;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #4cafef;
      color: white;
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.5;
    }
    .content h2 {
      color: #4cafef;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #4cafef;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      background-color: #f0f0f0;
      color: #777777;
      text-align: center;
      font-size: 14px;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Welcome to Our Platform 🎉
    </div>
    <div class="content">
      <h2>Hello ${username},</h2>
      <p>We’re excited to have you on board! Your account has been successfully created.</p>
      <p>Here’s what you can do next:</p>
      <ul>
        <li>Explore your dashboard</li>
        <li>Connect with other users</li>
        <li>Update your profile</li>
      </ul>
    </div>
    <div class="footer">
      © 2025 Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`
    )
}
   
module.exports = getWelcomeEmailHTML;
