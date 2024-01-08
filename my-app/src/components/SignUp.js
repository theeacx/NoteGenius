// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import MainPage from './MainPage';  // Import MainPage
import '../components-style/SignUp.css';

function SignUp({ onSignUpSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showMainPage, setShowMainPage] = useState(false);

  const handlePasswordMatch = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check and try again.");
    } else if(firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
      setError("Please fill out all fields."); }
      else if (email.includes('@stud.ase.ro') === false) {
        setError("Please use your student email.");
    } else {
      var User = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
      };
      axios.post('http://localhost:9000/api/user/', User, {
        headers: {'Content-Type': 'application/json'},
      })
      .then((response) => {
        console.log("User created successfully:", response.data);
        onSignUpSuccess();
        setShowMainPage(true);  // Show MainPage after successful sign-up
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setError("Error creating user. Please try again.");
      });
    }
  };

  return (
    <div>
      {showMainPage ? (
        <MainPage />
      ) : (
        <div className="signup-container">
          <form className="signup-form">
            <input style = {{marginBottom: '10px'}}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input style = {{marginBottom: '10px'}}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            <input style = {{marginBottom: '10px'}}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button type="button" onClick={handlePasswordMatch}>
              Create an account!
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
