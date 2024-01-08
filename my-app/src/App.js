import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './components/SignIn';
import './App.css';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSignInClick = () => {
    setShowSignIn(false);
  };

  // const handleSignIn = async (userEmail, userPassword) => {
  //   try {
      
  //     const response = await axios.post('http://localhost:9000/api/user/signin', { 
  //       email: userEmail, 
  //       password: userPassword 
  //     });
      
   
  //     console.log('Sign In Response:', response.data);


      
  //     setShowSignIn(false);
  //     } catch (error) {
  //       console.error('Error during sign in:', error);
  //     }
  // };

  const handleSignIn = async (userEmail, userPassword) => {
    try {
      const response = await axios.post('http://localhost:9000/api/user/signin', {
        email: userEmail,
        password: userPassword,
      });
  
      console.log('Sign In Response:', response.data);
      setShowSignIn(false);
      return response.data; // Return the user data on successful sign-in
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error; // Throw the error to be caught by the calling function
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      {showSignIn && <SignIn onSignIn={handleSignIn} />}
      </header>
    </div>
  );
}

export default App;

