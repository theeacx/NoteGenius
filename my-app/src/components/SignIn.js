import React, { useState } from 'react';
import '../components-style/SignIn.css';
import SignUp from '../components/SignUp';
import MainPage from './MainPage';

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [redirectToMain, setRedirectToMain] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onSignIn(email, password)
        .then(() => setRedirectToMain(true))
        .catch(() => {
          alert('Sign in failed. Please try again.');
        });
    } else {
      alert('Email and password are required.');
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    setRedirectToMain(true);
  };

  if (redirectToMain==true) {
    return <MainPage />;
  }

  if (showSignUp) {
    return <SignUp onSignUpSuccess={handleSignUpSuccess} />;
  }

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1>Welcome to APPNAME!</h1>
        <input style = {{marginBottom: '10px'}}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input style = {{marginBottom: '10px'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <div className="divider">
          <h2>Don't have an account?</h2>
          <div className="signup-link" onClick={handleSignUpClick}>
            Sign up
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
