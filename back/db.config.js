import mysql from 'mysql2/promise'

const db =  mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

if (db) {
  console.log('Connexion à la base de données réussie')
} else {
  console.log('Erreur de connexion à la base de données')
}

export default db