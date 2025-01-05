const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db.config.js')

exports.login = async (req, res) => {
  const { adresse_mail, mdp } = req.body

  if (!adresse_mail || !mdp) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  try {
    let user = 'SELECT * FROM t_user WHERE adresse_mail = ?'
    await db.query(user, [adresse_mail])

    if (user === null) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
    }

    let match = await bcrypt.compare(mdp, user.mdp)

    if (!match) {
      return res.status(401).json({ message: 'Mauvais mot de passe' })
    }

    const token = jwt.sign({
      id: user.id_t_user,
      nom: user.nom,
      prenom: user.prenom,
      adresse_mail: user.adresse_mail
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

    return res.json({ access_token: token })
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du login', error: err })
  }
}