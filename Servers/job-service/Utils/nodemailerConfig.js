import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

export const sendBidAcceptedEmail = async (email, username, status, jobTitle) => {
    let statusMessage = '';
    let buttonText = '';
    let buttonColor = '';
    let ctaLink = 'http://localhost:5173/jobs'; // TODO: Replace with actual job or dashboard URL
    let showCTA = true;

    switch (status.toLowerCase()) {
        case 'accepted':
            statusMessage = `
                We are pleased to inform you that your proposal for the job titled <strong>"${jobTitle}"</strong> has been <span style="color: green;"><strong>Accepted</strong></span> by the client.<br><br>
                This is an exciting opportunity to demonstrate your expertise and deliver exceptional results. You may now begin work as per the agreed timeline and milestones. Please ensure clear communication, timely updates, and quality delivery throughout the project lifecycle.
            `;
            buttonText = 'View Job Details';
            buttonColor = '#00A3FF';
            break;

        case 'rejected':
            statusMessage = `
                Thank you for submitting your proposal for the job titled <strong>"${jobTitle}"</strong>. While your skills and experience are appreciated, we regret to inform you that your bid was <span style="color: red;"><strong>Not Selected</strong></span> for this particular project.<br><br>
                This decision does not reflect negatively on your capabilities. Clients often choose freelancers based on several factors, including budget, timeline, and specific niche experience. We encourage you to continue applying for other relevant opportunities on HireBid. Your next success could be just around the corner!
            `;
            buttonText = 'Browse Other Jobs';
            buttonColor = '#00A3FF';
            break;

        case 'completed':
            statusMessage = `
                Congratulations! 🎉 The job <strong>"${jobTitle}"</strong> has been successfully <span style="color: #4CAF50;"><strong>Completed</strong></span>.<br><br>
                Thank you for your hard work, professionalism, and dedication throughout the project. Your efforts have contributed to a successful delivery and client satisfaction. Please take a moment to review the feedback provided, and we encourage you to request a testimonial or rating if applicable.<br><br>
                We look forward to seeing you excel in future projects on HireBid.
            `;
            buttonText = 'View Completion Summary';
            buttonColor = '#4CAF50';
            break;

        default:
            statusMessage = `
                Your bid status for the job <strong>"${jobTitle}"</strong> has been updated. Please check your dashboard for more details.
            `;
            showCTA = false;
            break;
    }

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Bid ${status.charAt(0).toUpperCase() + status.slice(1)} - ${jobTitle}`,
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; text-align: center">
            <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                <!-- Header with centered logo and title -->
                <div style="background: linear-gradient(to right, #f97316, #f59e0b); padding: 20px; text-align: center;">
                <div style="display: inline-flex; align-items: center; justify-content: center; gap: 10px;">
                    <img src="https://res.cloudinary.com/nanduvarma/image/upload/v1751466565/samples/Logo_n3lmxf.png" alt="HireBid Logo" style="height: 40px;" />
                    <div style="font-size: 24px; font-weight: bold; color: #ffffff;">
                    Hire<span style="color: #1E293B;">Bid</span>
                    </div>
                </div>
                </div>



                <!-- Body -->
                <div style="padding: 30px; color: #333;">
                    <p style="font-size: 18px;">Hello, <strong>${username}!</strong> 👋</p>
                    <p style="font-size: 16px;">${statusMessage}</p>

                    ${showCTA ? `
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${ctaLink}" style="background-color: ${buttonColor}; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px;">
                            ${buttonText}
                        </a>
                    </div>` : ''}

                    <p style="font-size: 14px; margin-top: 30px;">
                        If you have any questions or need support, feel free to reach out to us at 
                        <a href="mailto:support@hirebid.com" style="color: #007bff; text-decoration: none;">support@hirebid.com</a>.
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777;">
                <p style="margin-bottom: 10px;">Follow us on:</p>
                                    <div style="display: inline-flex; justify-content: center; align-items: center;">
                    <a href="https://twitter.com/hirebid" title="Twitter" style="margin-right: 8px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style="width: 20px;" />
                    </a>
                    <span style="color: #ccc;">|</span>

                    <a href="https://www.facebook.com/hirebid" title="Facebook" style="margin: 0 8px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style="width: 20px;" />
                    </a>
                    <span style="color: #ccc;">|</span>

                    <a href="https://www.linkedin.com/company/hirebid" title="LinkedIn" style="margin: 0 8px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 20px;" />
                    </a>
                    <span style="color: #ccc;">|</span>

                    <a href="https://www.instagram.com/hirebid" title="Instagram" style="margin: 0 8px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 20px;" />
                    </a>
                    <span style="color: #ccc;">|</span>

                    <a href="https://www.youtube.com/hirebid" title="YouTube" style="margin-left: 8px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" style="width: 20px;" />
                    </a>
                    </div>


                <p style="margin-top: 20px;">Thank you for being a part of the HireBid community!</p>
                <p style="margin-top: 10px;">&copy; 2025 HireBid. All rights reserved.</p>
                </div>

            </div>
        </body>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error while sending email:', error);
    }
};

export const sendPaymentInvoiceEmail = async (email, username, jobTitle, invoiceUrl, milestone) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Your Payment Invoice for "${jobTitle}" – HireBid`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 30px;">
                <div style="background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 30px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://res.cloudinary.com/nanduvarma/image/upload/v1751466565/samples/Logo_n3lmxf.png" alt="HireBid Logo" style="height: 50px;"/>
                        <h2 style="color: #333333; font-size: 22px; margin-top: 15px;">Payment Invoice Confirmation</h2>
                    </div>

                    <p style="font-size: 16px; color: #555555;">Hi <strong>${username}</strong>,</p>

                    <p style="font-size: 15px; color: #555555;">
                        We’ve received your payment for the milestone: <strong>${milestone.description}</strong> under the job titled: 
                        <strong>"${jobTitle}"</strong>.
                    </p>

                    <div style="margin: 20px 0; padding: 20px; background: #f1f5f9; border-radius: 6px;">
                        <p style="margin: 0; font-size: 14px; color: #333333;">
                            <strong>Milestone:</strong> ${milestone.description}<br/>
                            <strong>Amount Paid:</strong> ₹${milestone.amount}
                        </p>
                    </div>

                    <p style="font-size: 15px; color: #555555;">
                        You can download the invoice for your records from the button below:
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${invoiceUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Download Invoice (PDF)
                        </a>
                    </div>

                    <p style="font-size: 13px; color: #999999; text-align: center;">
                        If you have any questions or didn’t authorize this payment, please contact us at <a href="mailto:support@hirebid.in">support@hirebid.in</a>.
                    </p>
                </div>

                <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
                    &copy; ${new Date().getFullYear()} HireBid. All rights reserved.
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Invoice email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error while sending invoice email:', error);
    }
};
