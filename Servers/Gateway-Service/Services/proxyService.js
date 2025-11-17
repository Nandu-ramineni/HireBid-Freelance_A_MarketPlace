import axios from "axios";
import config from '../Config/env.js';

const { authServiceUrl, jobServiceUrl, reputationServiceUrl, paymentServiceUrl, chatServiceUrl, notificationServiceUrl } = config;

const serviceUrls = {
    auth: authServiceUrl,
    job: jobServiceUrl,
    reputation: reputationServiceUrl,
    payment: paymentServiceUrl,
    chat: chatServiceUrl,
    notification: notificationServiceUrl
};

export const forwardRequest = async (service, req, res) => {
    const { method, body, headers, params } = req; 
    const url = `${serviceUrls[service]}${req.originalUrl}`;

    console.log(`Forwarding request to: ${url}`); 

    try {
        const response = await axios({
            method,
            url,
            data: body,
            headers: {
                ...headers, 
                authorization: headers['authorization']
            },
            params 
        });

        return res.status(response.status).json(response.data);

    } catch (error) {
        const { response } = error; 
        res.status(response?.status || 500).json(
            response?.data || { message: 'Internal server error', error: error.message }
        );
    }
};
