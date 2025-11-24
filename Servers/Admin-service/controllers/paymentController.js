import axios from 'axios';

export const getAllPayments = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:6000//api/job/payment/all', {
            headers: {
                Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`
            }
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve payments',
            error: error.message,
        });
    }
};