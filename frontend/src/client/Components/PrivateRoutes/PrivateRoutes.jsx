
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = () => {
  const location = useLocation();
  const token = Cookies.get('accessToken');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const { exp } = decoded;
    const now = Math.floor(Date.now() / 1000);

    if (exp < now) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      localStorage.removeItem('role');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />; // ✅ Render the nested route
  } catch (err) {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('role');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;


// import { Navigate, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

// const PrivateRoute = () => {
//   const location = useLocation();
//   const accessToken = Cookies.get('accessToken');

//   if (!accessToken) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   try {
//     const decodedToken = jwtDecode(accessToken);
//     const { role, exp } = decodedToken;

//     const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

//     // Check if token is expired (15 minutes assumed already encoded in exp)
//     if (exp < currentTime) {
//       Cookies.remove('accessToken'); // Optional: clear the cookie
//       return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Token is valid, route based on role
//     if (role === 'client') {
//       return <Navigate to="/client-dashboard" />;
//     } else if (role === 'freelancer') {
//       return <Navigate to="/freelancer-dashboard" />;
//     } else {
//       return <Navigate to="/login" />;
//     }
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
// };

// export default PrivateRoute;
