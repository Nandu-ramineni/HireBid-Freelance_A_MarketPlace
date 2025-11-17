import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api';
const JOB_URL = 'http://localhost:7000/api';
export const authenticateLogin = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;  
        } else {
            console.log('Error while calling authenticateLogin API: ', error.message);
            return { status: 500, data: { message: 'An unexpected error occurred. Please try again.' } };
        }
    }
};

export const authenticateSignup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const forgotPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const sendOTP = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password/send-otp`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const verifyOTP = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password/verify-otp`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const resetPassword = async (resetToken,data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password/${resetToken}`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const GoogleAuthentication = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/auth/google`,{token});
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getUser = async () =>{
    try {
        const response = await axios.get(`${API_URL}/auth/getUser`,{
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const userUpdate = async(data) =>{
    try {
        const response = await axios.patch(`${API_URL}/auth/update`,data,{
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        })
        return response;
    } catch (error) {
        return error.response;
    }
}

export const clientProfileUpdate = async(data) =>{
    try {
        const response = await axios.patch(`${API_URL}/auth/update-clientProfile`,data,{
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        })
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getAllFreelancers = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/freelancers`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getClient = async() =>{
    try {
        const response = await axios.get(`${API_URL}/auth/getClient`,{
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const saveFreelancerProfile = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/save-freelancer`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getSavedProfiles = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/get-saved-freelancers`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const postReview = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/post-review`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error in postReview API:", error);
        throw error
    }
}


export const generateClientReport = async () => {
    try {
        const response = await axios.get(`${JOB_URL}/jobs/client-report`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error in generateClientReport API:", error);
        throw error
    }
}
