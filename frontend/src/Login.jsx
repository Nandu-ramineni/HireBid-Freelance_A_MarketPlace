import  { useState } from 'react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-between border-b mb-4">
          <button
            className={`w-1/2 text-lg py-2 ${activeTab === 'login' ? 'bg-white border-b-2 border-black font-semibold' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`w-1/2 text-lg py-2 ${activeTab === 'signup' ? 'bg-white border-b-2 border-black font-semibold' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300">
          Sign In
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500">OR CONTINUE WITH</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex justify-around">
          <button className="flex items-center justify-center w-24 p-2 border rounded-lg hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center w-24 p-2 border rounded-lg hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Microsoft" className="w-5 h-5 mr-2" />
            Microsoft
          </button>
          <button className="flex items-center justify-center w-24 p-2 border rounded-lg hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-5 h-5 mr-2" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
