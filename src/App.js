import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Message from './components/message';
import Photo from './components/photo';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/message" element={<Message />} />
                <Route path="/photos" element={<Photo/>} />
            </Routes>
        </Router>
    );
};

export default App;
