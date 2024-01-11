//NotePage.js

import React, { useState, useEffect } from 'react';
import '../components-style/NotePage.css';
import MyCard from './MyCard';
import axios from 'axios';

function NotePage({ user }) {

    return (
        <div className="note-page-container">
            <h1 className="note-page-title">Note Page</h1>
            <div className="note-page-cards">
                <MyCard />
            </div>
        </div>
    );
}