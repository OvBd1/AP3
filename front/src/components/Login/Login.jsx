import React, {useState} from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [adresse_mail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Remplacez par votre appel API pour la connexion
        fetch('http://localhost:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adresse_mail, password }),
        })
        .then((response) => {
            if (response.ok) {
                navigate('/home');
            } else {
                alert('Nom d’utilisateur ou mot de passe incorrect');
            }
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Connexion</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Email'
                    value={adresse_mail}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />    
                    <FaLock className='icon' />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;