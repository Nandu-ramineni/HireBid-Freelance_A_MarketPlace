import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const RoleRedirectRoute = () => {
  const token = Cookies.get('accessToken');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const { role, exp } = decoded;
    localStorage.setItem('role', role); // Store role in localStorage for later use
    const now = Math.floor(Date.now() / 1000);

    if (exp < now) {
      Cookies.remove('accessToken');
      localStorage.removeItem('role'); // Remove role from localStorage
      return <Navigate to="/login" replace />;
    }

    if (role === 'client') return <Navigate to="/client-dashboard" replace />;
    if (role === 'freelancer') return <Navigate to="/freelancer-dashboard" replace />;
    return <Navigate to="/login" replace />;
  } catch {
    Cookies.remove('accessToken');
    return <Navigate to="/login" replace />;
  }
};

export default RoleRedirectRoute;
