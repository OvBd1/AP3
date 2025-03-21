import mysql from 'mysql2'

// Configuration de la connexion
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'db_slam_ap',
}

// Ajouter le mot de passe seulement s'il est défini
if (process.env.DB_PASS) {
  config.password = process.env.DB_PASS
}

const db = mysql.createConnection(config).promise()

// Test de connexion
db.connect()
  .then(() => console.log('✅ Connecté à la base de données MySQL'))
  .catch((err) => console.error('❌ Erreur de connexion à la base de données:', err))

export default db