import { hash as _hash } from "bcrypt"
import db from '../db.config.js'

export function getAllUsers(req, res) {
	db.query("SELECT * FROM t_user")
		.then((users) => res.json({ data: users[0] }))
		.catch((err) =>
			res.status(500).json({ message: "Erreur BDD", error: err })
		)
}

export async function getUser(req, res) {
	let userId = parseInt(req.params.id)

	if (!userId) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}
	try {
		let data = await db.query("SELECT * FROM t_user WHERE id_t_user = ?", [userId])
		if (data === null) {
			return res.status(404).json({ message: "Utilisateur n'existe pas" })
		}
		return res.json({ data: data[0] })
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

export async function addUser(req, res) {
  let { nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance } = req.body
	
  if (!nom || !prenom || !adresse_mail || !mdp) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

  try {
    let user = await db.query("SELECT * FROM t_user WHERE adresse_mail = ?", [adresse_mail])
    
    if (user[0].length === 0) {
      let hash = await _hash(mdp, parseInt(process.env.BCRYPT_SALT_ROUND))
      mdp = hash

      console.log(mdp)
  
      let userc = "INSERT INTO t_user (nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance) VALUES (?, ?, ?, ?, ?, ?, ?)"
      user = await db.query(userc, [nom, prenom, adresse_mail, hash, adresse, num_tel, date_naissance])
      return res.json({ message: "Utilisateur créé" })
    }
    return res.status(409).json({ message: `L'utilisateur ${user.nom} existe déjà` })

  } catch (err) {
    res.status(500).json({ message: "Erreur BDD", error: err })
  }
}

export async function updateUser(req, res) {
  let userId = parseInt(req.params.id)

  let { nom, prenom, adresse_mail, adresse, num_tel } = req.body

  if (!userId) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  try {
    let user = await db.query('SELECT * FROM t_user WHERE id_t_user = ?', [userId])
    if (user[0].length === 0) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
    }

    let userUpdate = await db.query(
      'UPDATE t_user SET nom = ?, prenom = ?, adresse_mail = ?, adresse = ?, num_tel = ? WHERE id_t_user = ?', 
      [nom, prenom, adresse_mail, adresse, num_tel, userId]
    )
    return res.json({ message: 'Utilisateur modifié' })    
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erreur BDD', error: err })
  }
}

export function deleteUser(req, res) {
  let userId  = parseInt(req.params.id)

  if (!userId) {
    return res.status(400).json({ message: "Il manque un paramètre" })
  }

  db.query("DELETE FROM t_user WHERE id_t_user = ?", [userId])
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Erreur BDD", error: err })
    )
}