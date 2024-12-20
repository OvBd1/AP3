const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'slam_gsb'
});

app.post('/login', (req, res) => {
    const { adresse_mail, mdp } = req.body;

    const query = 'SELECT * FROM t_users WHERE adresse_mail = ? AND mdp = ?';
    db.query(query, [adresse_mail, mdp], (err, result) => {
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

app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});