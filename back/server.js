const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')

let db = require ('./db.config.js')

const user_router = require('./routes/users')
const auth_router = require('./routes/authentifications')

const app = express()
app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedheaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => res.send('Serveur démarré'))

app.use('/users', checkTokenMiddleware, user_router)
app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('Page non trouvée'))


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.SERVER_PORT}`)
})