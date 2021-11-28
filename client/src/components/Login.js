import axios from 'axios';
import React, { useState } from 'react';

const Login = ({ setCurrentUser, getCurrentUser }) => {
  const [values, setValues] = useState({ email: '', password: '' });

  const loginUser = async () => {
    const res = await axios.post('api/users/login/', values, { headers: { "Content-Type": "application/json" } });
    const token = await res.data.token
    localStorage.setItem("authToken", token);
    await getCurrentUser()
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  }

  const logOut = async () => {
    await localStorage.removeItem('authToken');
    setCurrentUser('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <input type="text" placeholder="name" /> */}
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          name="email" />
        <input
          type="text"
          placeholder="password"
          onChange={handleChange}
          name="password" />
        <input type="submit" value="login" />
      </form>
      <button onClick={logOut}>logout</button>
    </>
  );
};

export default Login;

