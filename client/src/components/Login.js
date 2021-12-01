import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { email, password } = values;
  const base = 'https://auth101-gt.herokuapp.com';

  const loginUser = async () => {
    const res = await axios.post(`${base}/api/users/login/`, values, { headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const token = await res.data.token
    localStorage.setItem("authToken", token);
    navigate('/');
    // setCurrentUser({ name: res.data.user.name, id: res.data.user.id, email: res.data.user.email })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
    setValues({ email: '', password: '' })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <input type="text" placeholder="name" /> */}
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          value={email}
          name="email" />
        <input
          type="text"
          placeholder="password"
          onChange={handleChange}
          value={password}
          name="password" />
        <input type="submit" value="login" />
      </form>
      <Link to="/signup">No account? Sign up!</Link>
    </>
  );
};

export default Login;

