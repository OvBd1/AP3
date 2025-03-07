const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Mets ici ton mot de passe MySQL
    database: 'nombdd'
});

// Route pour gérer la connexion des utilisateurs
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vérification dans la base de données
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }
        if (result.length > 0) {
            res.status(200).send('Connexion réussie');
        } else {
            res.status(401).send('Nom d’utilisateur ou mot de passe incorrect');
        }
    });
});

// Lancer le serveur
app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});