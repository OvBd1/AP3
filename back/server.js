const express = require('express')
const cors = require('cors')

let db = require ('./db.config.js')
const user_router = require('./routes/users')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => res.send('Serveur démarré'))

app.use('/users', user_router)

app.get('*', (req, res) => res.status(501).send('Page non trouvée'))

// Lancer le serveur

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.SERVER_PORT}`)
})