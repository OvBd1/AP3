import { hash as _hash } from "bcrypt"
import db from '../db.config.js'
import pkg from 'jsonwebtoken'

const { decode } = pkg

export function getAllUsers(req, res) {
	db.query("SELECT * FROM user")
		.then((users) => res.json(users[0]))
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
		let data = await db.query("SELECT * FROM user WHERE id_user = ?", [userId])
		if (data === null) {
			return res.status(404).json({ message: "Utilisateur n'existe pas" })
		}
		return res.json(data[0])
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

export async function getUserAuthenticated(req, res) {
  let token = req.headers['authorization'].replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: "Non autorisé" })
  }

  try {
    const decoded = decode(token, process.env.JWT_SECRET, { complete: true });
    const userId = decoded.id;

    let data = await db.query("SELECT * FROM user WHERE id_user = ?", [userId]);
    if (data[0].length === 0) {
      return res.status(404).json({ message: "Utilisateur n'existe pas" });
    }
    console.log("User data retrieved:", data[0][0]);
    return res.json(data[0][0]);
  } catch (err) {
    return res.status(401).json({ message: "Token invalide", error: err });
  }
}

export async function addUser(req, res) {
  let { nom, prenom, mail, mdp, num_tel, date_naissance } = req.body
	
  if (!nom || !prenom || !mail || !mdp) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

  try {
    let user = await db.query("SELECT prenom FROM user WHERE mail = ?", [mail])
    
    if (user[0].length === 0) {
      let hash = await _hash(mdp, parseInt(process.env.BCRYPT_SALT_ROUND))
  
      let userc = "INSERT INTO user (nom, prenom, mail, mdp, num_tel, date_naissance) VALUES (?, ?, ?, ?, ?, ?)"
      user = await db.query(userc, [nom, prenom, mail, hash, num_tel, date_naissance])
      return res.json({ message: "Utilisateur créé" })
    }
    return res.status(409).json({ message: `L'utilisateur ${user.nom} existe déjà` })

  } catch (err) {
    res.status(500).json({ message: "Erreur BDD", error: err })
  }
}

export async function updateUser(req, res) {
  let userId = parseInt(req.params.id)

  let { nom, prenom, mail, num_tel } = req.body

  if (!userId) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  try {
    let user = await db.query('SELECT * FROM user WHERE id_user = ?', [userId])
    if (user[0].length === 0) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
    }

    let userUpdate = await db.query(
      'UPDATE user SET nom = ?, prenom = ?, mail = ?, num_tel = ? WHERE id_user = ?', 
      [nom, prenom, mail, num_tel, userId]
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

  db.query("DELETE FROM user WHERE id_user = ?", [userId])
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Erreur BDD", error: err })
    )
}