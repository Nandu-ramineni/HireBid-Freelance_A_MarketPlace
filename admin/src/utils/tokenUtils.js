import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('accessToken');

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};
