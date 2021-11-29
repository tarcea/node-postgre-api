import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Sign Up</h1>

      <Link to="/login">Already have an account? Log in!</Link>
    </div>
  );
}

export default SignUp
