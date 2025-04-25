import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('⚠️ Username and Password required');
      return;
    }
    if (username.trim() === 'alietseating' && password.trim() === 'admin') {
      navigate('/admin');
    } else {
      setError('❌ Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-800 via-indigo-600 to-pink-500 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex overflow-hidden animate-fade-in">
        
        {/* Left Side - Image */}
        <div className="w-1/2 bg-white flex items-center justify-center p-8">
          <img
            src="https://res.cloudinary.com/dcmt06mac/image/upload/v1744523819/logo_zrh6oy.jpg"
            alt="Login"
            className="w-[85%] max-w-md"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10 py-14 bg-white">
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Admin Credentials Login</h2>

          <form
            className="w-full max-w-sm mt-4 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-[40%] mx-auto block h-12 rounded-full bg-gray-100 px-5 text-center shadow focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-[40%] mx-auto block h-12 rounded-full bg-gray-100 px-5 text-center shadow focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
            />

            <div className="flex justify-between w-[85%] mx-auto text-sm text-gray-500">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-orange-500" /> Remember
              </label>
              <span className="hover:underline cursor-pointer">Forgot Password?</span>
            </div>

            {error && (
              <div className="text-center text-red-600 font-medium -mt-4">{error}</div>
            )}

            <button className="shadow-glow hover:shadow-xl transition-all duration-300">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
