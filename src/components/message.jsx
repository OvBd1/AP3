// src/components/Message.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './message.css';


const Message = () => {
    return (
        <div className='message-perso'>
            <h1>Bienvenue !</h1>
            <p>Je suis ravi de vous accueillir ici. Vous pourrez trouver ici toutes les photos de Pablo (que j'ai pu récupérer)
            <br/>Les photos sont triées ; appuyez sur une catégorie pour toutes les afficher.
            <br/> Cordialement, Théo :) </p>
            <Link to="/photos" className="continue-button">Continuer</Link>
        </div>
    );
};

export default Message;
