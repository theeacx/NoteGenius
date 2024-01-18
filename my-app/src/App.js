import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './components/SignIn';
import MainPage from './components/MainPage'; // Import MainPage component
import './App.css';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [userId, setUserId] = useState(null); 

  const handleSignInClick = () => {
    setShowSignIn(false);
  };

  const handleSignIn = async (userEmail, userPassword) => {
    try {
      const response = await axios.post('http://localhost:9000/api/user/signin', {
        email: userEmail,
        password: userPassword,
      });

      console.log('Sign In Response:', response.data);
      setUserId(response.data.UserID);
      setRedirectToMain(true); 
      setShowSignIn(false);
      return response.data; 
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error; 
    }
  };

  const handleSignOut = () => {
    setRedirectToMain(false);
    setShowSignIn(true);
    setUserId(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {showSignIn && <SignIn onSignIn={handleSignIn} />}
        {redirectToMain && <MainPage userId={userId} onLogOut={handleSignOut} />} 
      </header>
    </div>
  );


}


// console.log('User ID:', userId);

export default App;
