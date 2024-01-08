import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';


function MyNavbar () {
  const navbarStyle = {
    backgroundColor: '#343a40', 
    borderBottom: '1px solid #333', 
    color: 'white', 
  };

  return (
    <Navbar style={navbarStyle} variant="dark">
      <Navbar.Brand href="#home" >My React App</Navbar.Brand>
      <Nav className="ml-auto">
        <React.Fragment>
          <Nav.Link href="">Home</Nav.Link>
          <Nav.Link href="">About</Nav.Link>
          <Nav.Link href="">Groups</Nav.Link>
        </React.Fragment>
      </Nav>
    </Navbar>
  );
}

export default MyNavbar;
