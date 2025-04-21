import { compare } from 'bcrypt'
import pkg from 'jsonwebtoken'
import db from '../db.config.js'

const { sign } = pkg

export async function login(req, res) {
  const { mail, mdp } = req.body

  if (!mail || !mdp) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  try {
    const req = await db.query('SELECT * FROM user WHERE mail = ?', [mail])
    let user = req[0][0]
   
    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
    }

    let match = await compare(mdp, user.mdp)

    if (!match) {
      return res.status(401).json({ message: 'Mauvais mot de passe' })
    }

    const token = sign({
      id: user.id_user,
      nom: user.nom,
      prenom: user.prenom,
      mail: user.mail
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

    return res.json({ access_token: token, admin: user.admin })
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du login', error: err })
  }
}