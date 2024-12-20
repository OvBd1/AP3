import React, {useState} from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => {
            if (response.ok) {
                navigate('/message');
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
                    <input type='text' placeholder='Nom d’utilisateur'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />    
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;