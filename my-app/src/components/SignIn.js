import React, { useState } from 'react';
import '../components-style/SignIn.css';

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <h1>Do you have an account?</h1>
        <button type="button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignIn;
