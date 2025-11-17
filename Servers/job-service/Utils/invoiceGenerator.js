import easyinvoice from "easyinvoice";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import os from "os";
import qrcode from "qrcode";
import cloudinary from "./cloudinaryConfig.js";
import Job from "../Models/Job.js";


export const generateInvoiceAndUpload = async ({ client, freelancer, job, milestone, amount, paymentId, }) => {
    try {
        const invoicePdfName = `invoice_${paymentId}`;
        const invoiceCloudinaryUrl = `https://res.cloudinary.com/nanduvarma/raw/upload/invoices/${invoicePdfName}.pdf`;

        // Generate QR Code for invoice URL
        const qrCodeDataURL = await qrcode.toDataURL(invoiceCloudinaryUrl);

        const invoiceData = {
            apiKey:"F3doKjK6WphwGW4QXK4aIHfoaQkcT9ooSLdEiWJzPMIHMKNBGQzZA57ehVkYNrjH",
            images: {
                // background: "https://res.cloudinary.com/nanduvarma/image/upload/v1751814288/invoices/Hirebid_Invoice_co69d3.pdf"
                background:"https://res.cloudinary.com/nanduvarma/image/upload/v1751816198/Hirebid_Invoice_ji9j9h.pdf"
            },
            sender: {
                company: "HireBid Technologies Pvt. Ltd.",
                address: "Tech Arena, Jubilee Hills, Hyderabad, Telangana",
                zip: "500081",
                city: "Hyderabad",
                country: "India"
            },
            client: {
                company: `${client?.clientProfile?.company}`,
                address: client?.clientProfile?.location || "",
                phone: client?.clientProfile?.phoneNumber || ""
            },
            information: {
                number: paymentId,
                date: new Date().toLocaleDateString(),
                "due-date": new Date().toLocaleDateString()
            },
            products: [
                {
                    quantity: 1,
                    description: `Milestone - ${milestone.description}`,
                    tax: 0,
                    price: amount
                }
            ],
            bottomNotice: `
                <div style="text-align: center; line-height: 1.6; font-size: 12px;">
                    <span style="font-size: 16px;">✅</span> <strong>This invoice confirms the successful payment for the milestone.</strong><br/>
                    <span style="color: #2E86C1;">📍</span> HireBid Technologies Pvt. Ltd.<br/>
                    <span style="color: #2E86C1;">✉️</span> <a href="mailto:support@hirebid.in" style="color: #2E86C1; text-decoration: none;">support@hirebid.in</a><br/>
                    <span style="color: #2E86C1;">☎️</span> +91-9100000000<br/>
                    <span style="color: #2E86C1;">🌐</span> <a href="https://www.hirebid.in" target="_blank" style="color: #2E86C1; text-decoration: none;">www.hirebid.in</a><br/><br/>
                    <span style="font-size: 16px;">🔍</span> Scan the QR code above to instantly access your invoice online.
                </div>
            `,
            settings: {
                currency: "INR",
                tax: 0,
            },
            // customize: {
            //     template: 'base64',
            //     color: "#2E86C1",
            //     qr: qrCodeDataURL,
            //     text: "Thank you for your business!",
            // },
        };

        const result = await easyinvoice.createInvoice(invoiceData);
        const invoicePath = path.join(os.tmpdir(), `${uuidv4()}.pdf`);
        fs.writeFileSync(invoicePath, result.pdf, 'base64');

        const uploadResult = await cloudinary.v2.uploader.upload(invoicePath, {
            resource_type: "raw",
            folder: "invoices",
            public_id: invoicePdfName
        });

        fs.unlinkSync(invoicePath);
        const updatedJob = await Job.findOneAndUpdate(
            {
                _id: job._id,
                "milestones._id": milestone._id
            },
            {
                $set: {
                    "milestones.$.invoice": uploadResult.secure_url
                }
            },
            { new: true }
        );
        if (!updatedJob) {
            throw new Error("Job or milestone not found");
        }
        return uploadResult.secure_url;
    } catch (error) {
        console.error("Error generating/uploading invoice:", error);
        throw new Error("Invoice generation failed");
    }
};
