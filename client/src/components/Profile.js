import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const base = 'https://auth101-gt.herokuapp.com';

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const getUserData = async (token) => {
    try {
      let resp = await axios.get(`${SERVER_URL}/api/users/user`, {
        headers: { "Authorization": `Bearer ${token}` },
      })
      console.log(resp.data)
      const user = await resp.data;
      setCurrentUser(user)
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
    } else {
      getUserData(token)
    }
  }, []);

  const logOut = async () => {
    await localStorage.removeItem('authToken');
    navigate('/login')
  }

  return (
    <div>
      {error && error}
      {currentUser.user && <h1>Hello, {currentUser.user.name}</h1>}
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default Profile;

