import Payment from "../Models/Payment.js";
// import { makePaymentTransaction } from "../Services/paymentService.js";
import { captureRazorPayPayment, createRazorPayOrder } from "../Services/razorpayService.js";

export const createFiatPayment = async(req,res) => {
    const {jobId,freelancerId,amount,currency} = req.body;
    const {userId} = req.user;
    try {
        const {orderId,paymentId} = await createRazorPayOrder(amount,currency,userId,jobId,freelancerId);
        res.status(201).json({message: 'Payment order created',orderId,paymentId});
    } catch (error) {
        res.status(500).json({message: 'Payment order creation failed',error: error.message});
    }
}

export const captureFiatPayment = async(req,res) => {
    const {razorpayPaymentId,razorpayOrderId,razorpaySignature} = req.body;
    try {
        const payment = await captureRazorPayPayment(razorpayPaymentId,razorpayOrderId,razorpaySignature);
        if(payment.status === 'failed'){
            res.status(400).json({message: payment.message});
        }
        res.status(200).json({message: 'Payment successful',payment});
    } catch (error) {
        res.status(500).json({message: 'Payment failed',error: error.message});
    }
}

// export const createCryptoPayment = async(req,res) => {
//     const {jobId,freelancerId,amount} = req.body;
//     const {clientId} = req.user;
//     try {
        
//         const transactionHash = await makePaymentTransaction(clientId,freelancerId,amount);
//         const payment = new Payment({
//             jobId,
//             clientId,
//             freelancerId,
//             amount,
//             paymentMethod: 'crypto',
//             transactionHash,
//             status: 'completed',
//         });
//         await payment.save();
//         res.status(201).json({message: 'Crypto Payment successful',payment});
//     } catch (error) {
//         res.status(500).json({message: 'Payment failed',error: error.message});
//     }
// }