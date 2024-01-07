import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './components/SignIn';
import './App.css';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSignInClick = () => {
    setShowSignIn(false);
  };

  const handleSignIn = async (userEmail, userPassword) => {
    try {
      
      const response = await axios.post('http://localhost:9000/user/signin', { 
        email: userEmail, 
        password: userPassword 
      });
      
      console.log('Sign In Response:', response.data);

      setShowSignIn(false);
      } catch (error) {
        console.error('Error during sign in:', error);
      }
  };

  const handleClickUser = async () => {
    try {
      const userId = document.getElementById("userIdInput").value;
      const response = await axios.get(`http://localhost:9000/api/user/${userId}`);
      console.log('User:', response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="App">
      {showSignIn && <SignIn onSignIn={handleSignIn} />}
    </div>
  );
}

export default App;
