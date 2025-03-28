import { useState } from 'react';
import axios from 'axios';
import './Register.scss';
import cosmicBg from '../assets/images/memory-bg.gif';
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error registering');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${cosmicBg})` }}
    >
      <div className="register-container">
        <h2>Register</h2>
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
          <button type="submit">Register</button>
          <button type="button" onClick={handleLoginRedirect}>
            Back
          </button>
        </form>
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
