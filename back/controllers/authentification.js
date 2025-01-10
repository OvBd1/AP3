import { compare } from 'bcrypt'
import pkg from 'jsonwebtoken';
import db from '../db.config.js'

const { sign } = pkg

export async function login(req, res) {
  const { adresse_mail, password } = req.body

  if (!adresse_mail || !password) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  try {
    const req = await db.query('SELECT * FROM t_user WHERE adresse_mail = ?', [adresse_mail])
    let user = req[0][0]
    console.log(user)
    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
    }

    let match = await compare(password, user.mdp)
    console.log(match)

    if (!match) {
      return res.status(401).json({ message: 'Mauvais mot de passe' })
    }

    

    const token = sign({
      id: user.id_t_user,
      nom: user.nom,
      prenom: user.prenom,
      adresse_mail: user.adresse_mail
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

    console.log(token)
    return res.json({ access_token: token })
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du login', error: err })
  }
}