import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import './App.css';
import Login from './components/Login';


const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('')
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  // const getUsers = async () => {
  //   const result = await axios.get('api/users', { headers: { 'token': token } });
  //   setUsers(result.data);
  // }

  const getCurrentUser = () => {
    token && setCurrentUser(JWT.verify(token, process.env.REACT_APP_JWT_SECRET));
  }

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    getCurrentUser();
    // getUsers();
  }, []);

  return (
    <div className="App">
      {currentUser.email}
      <p>{users[0]?.name}</p>
      <Login setCurrentUser={setCurrentUser} getCurrentUser={getCurrentUser} />
    </div>
  );
}

export default App;
