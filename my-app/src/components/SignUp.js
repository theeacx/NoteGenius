import React, { useState } from 'react';
import './SignUp.css'; 
import '../components-style/SignUp.css';

function SignUp() {

    return (
        <div className="signup-container">
            <form className="signup-form">
                <input 
                    type="text" 
                    placeholder="First Name"
                />
                <input 
                    type="text" 
                    placeholder="Last Name"
                />
                <input 
                    type="text" 
                    placeholder="Email" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                />
                <button type="button">Create an account!</button>
            </form>
        </div>
    );
}

export default SignUp;
