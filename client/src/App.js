import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';

function App() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const getUsers = async () => {
    const result = await axios.get('api/users', { headers: { 'token': token } });
    setUsers(result.data);
  }

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    getUsers();
  }, []);

  return (
    <div className="App">
      {token}
      <p>{users[0]?.name}</p>
      <Login />
    </div>
  );
}

export default App;
