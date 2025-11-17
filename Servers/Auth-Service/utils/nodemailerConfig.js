import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

export const sendResetPasswordEmail = async (email, resetToken) => {
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Request',
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                <div style="background-color: #1A2130; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold;">
                    HireBid
                </div>
                <div style="padding: 20px;">
                    <p>Hello!👋 ${email},</p>
                    <p>You requested a password reset. Click the link below to reset your password:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">
                            Reset Password
                        </a>
                    </div>
                    <p>If the button above doesn't work, paste the following link into your browser:</p>
                    <p><a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a></p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
                <div style="padding: 20px; text-align: center; color: #888888; font-size: 14px;">
                    <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:support@hirebid.com" style="color: #007bff; text-decoration: none;">support@hirebid.com</a>.</p>
                </div>
            </div>
        </body>`
    }
    return await transporter.sendMail(mailOptions);
}

export const sendOtp = async(email,otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Password Reset', 
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                <div style="background-color: #1A2130; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold;">
                    HireBid
                </div>
                <div style="padding: 20px;">
                    <p>Hello!👋 There,</p>
                    <p>You have requested to reset your password. To reset your password, please use the following OTP code:</p>
                    <div style="background-color: #f4f4f4; border-radius: 8px; padding: 20px; text-align: center; font-weight: bold; font-size: 24px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p>This OTP will expire in the next 5 minutes.</p>
                    <p>If you did not request to reset your account, please ignore this email.</p>
                </div>
                <div style="padding: 20px; text-align: center; color: #888888; font-size: 14px;">
                    <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:support@hirebid.com" style="color: #007bff; text-decoration: none;">support@hirebid.com</a>.</p>
                </div>
            </div>
        </body>`
    }
    return await transporter.sendMail(mailOptions);
}

export const sendWelcomeEmail = async (email, username) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome to HireBid',
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                
                <!-- Header with Image -->
                <div style="text-align: center; background-color: #1A2130; color: #ffffff; padding: 20px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/7798/7798143.png" alt="HireBid Logo" style="width: 120px; margin-bottom: 10px;">
                    <h1 style="margin: 0; font-size: 28px;">Welcome to HireBid, 👋${username}!</h1>
                </div>
                
                <!-- Body Content -->
                <div style="padding: 20px; color: #333333;">
                    <h2 style="color: #1A2130;">Hello ${username},</h2>
                    <p>Welcome to <strong>HireBid</strong>! We are thrilled to have you as part of our community.</p>

                    <p>Whether you're a client searching for top-notch talent, or a freelancer looking for exciting opportunities, 
                    HireBid provides the perfect platform to connect you with the best people for your projects or work.</p>
                    
                    <p>Our platform is designed to offer seamless experiences for both clients and freelancers, with features such as:</p>

                    <ul style="padding-left: 20px; list-style-type: none; color: #333;">
                        <li>💳 Secure and easy-to-use payment system</li>
                        <li>🛠️ Streamlined project management tools</li>
                        <li>📈 Milestone-based payment tracking</li>
                        <li>💬 Real-time chat for better communication</li>
                        <li>🌟 Top-rated freelancers for every skill set</li>
                    </ul>

                    <p style="margin-top: 20px;">If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@hirebid.com" style="color: #007bff; text-decoration: none;">support@hirebid.com</a>.</p>

                    <div style="margin-top: 20px;">
                        <a href="https://hirebid.com/get-started" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Get Started</a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #1A2130; color: #ffffff; text-align: center; padding: 20px; font-size: 14px;">
                    <p style="margin: 0;">HireBid | Empowering Freelancers & Clients Worldwide</p>
                    <p style="margin: 0;">Follow us on:</p>
                    <div style="margin-top: 10px;">
                        <a href="https://twitter.com/hirebid" style="margin-right: 10px; color: #ffffff;"><img src="https://cdn-icons-png.freepik.com/256/3256/3256013.png?semt=ais_hybrid" alt="Twitter" style="width: 20px;"></a>
                        <a href="https://linkedin.com/hirebid" style="color: #ffffff;"><img src="https://cdn-icons-png.freepik.com/256/15047/15047435.png?ga=GA1.1.53488123.1727942773&semt=ais_hybrid" alt="LinkedIn" style="width: 20px;"></a>
                    </div>
                </div>
            </div>
        </body>`
    };
    return await transporter.sendMail(mailOptions);
}
