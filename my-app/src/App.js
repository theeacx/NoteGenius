import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  // handleClick()
  // {
  //   // Make an HTTP GET request to your backend API
  //   axios.get('http://localhost:9000/api/users')
  //     .then((response) => {
  //       // Log the user list when the request is successful
  //       console.log('User List:', response.data);
  //     })
  //     .catch((error) => {
  //       // Handle errors if the request fails
  //       console.error('Error fetching user list:', error);
  //     });
  // }
  async handleClick() {
    try {
      const response = await axios.get('http://localhost:9000/api/users');
      console.log('User List:', response.data);
    } catch (error) {
      console.error('Error fetching user list: ', error);
    }
  }
  async handleClickUser()
  {
    try {
      const userId = document.getElementById("userIdInput").value;
      const response = await axios.get(`http://localhost:9000/api/user/${userId}`);
      
      console.log('User:', response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  render() {
    return (
      <div className="App">
        <button id="btn" onClick={this.handleClick} >Click me</button>
        <button id="btn2" onClick={this.handleClickUser} >Click me</button>
        <input type="text" id="userIdInput" placeholder="Enter User ID"></input>
      </div>
    );
  }
}
export default App;
