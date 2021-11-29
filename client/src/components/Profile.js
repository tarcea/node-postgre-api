import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  const getUserData = async (token) => {
    let resp = await axios.get('/api/users/user', {
      headers: { "Authorization": `Bearer ${token}` },
    })
    console.log(resp.data)
    const user = await resp.data;
    setCurrentUser(user)
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
      {currentUser.user && <h1>Hello, {currentUser.user.name}</h1>}
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default Profile;

