import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import WalletConnect from "../WalletConnect/WalletConnect.jsx";

const Login = ({onLogin}) => {
  const [formData, setFormData] = useState({username: 'user@test.com', password: '1234'});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button" onClick={handleRegisterRedirect}>
              Register
            </button>
          </div>
        </form>

        <WalletConnect />
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
