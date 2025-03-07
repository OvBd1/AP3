import express from 'express'
import cors from 'cors'
import checkTokenMiddleware from './jsonwebtoken/check.js'

import  auth_router from './routes/authentifications.js'
import user_router from './routes/users.js'
import product_router from './routes/products.js'

const app = express()
app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedheaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => res.send('Serveur démarré'))

app.use('/auth', auth_router)
app.use('/users', /*checkTokenMiddleware,*/ user_router)
app.use('/api/products', product_router)

app.get('*', (req, res) => res.status(501).send('Page non trouvée'))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Erreur serveur', error: err.message })
})

const port = process.env.SERVER_PORT || 3001

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
})