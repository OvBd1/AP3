const bcrypt = require("bcrypt")
const db = require("../db.config.js")

exports.getAllUsers = (req, res) => {
	const query = "SELECT * FROM t_user"
	db.query(query)
		.then((users) => res.json({ data: users }))
		.catch((err) =>
			res.status(500).json({ message: "Erreur BDD", error: err })
		)
}

exports.getUser = async (req, res) => {
	let { id } = parseInt(req.params)

	if (!id) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}
	try {
		let user = "SELECT * FROM t_user WHERE id_t_user = ?"
		await db.query(user, [id])
		if (user === null) {
			return res.status(404).json({ message: "Utilisateur n'existe pas" })
		}
		return res.json({ data: user })
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

exports.addUser = async (req, res) => {
  let { nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance} = req.body

	if (!nom || !prenom || !adresse_mail || !mdp) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

  try {
    
	let user = "SELECT * FROM t_user WHERE adresse_mail = ?"
	await db.query(user, [adresse_mail])
			if (user !== null) {
				return res.status(409).json({ message: `L'utilisateur ${user.nom} existe déjà` })
			}

      let hash = await bcrypt.hash(mdp, parseInt(process.env.BCRYPT_SALT_ROUND))
      req.body.mdp = hash

      let userc = "INSERT INTO t_user (nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance) VALUES (?, ?, ?, ?, ?, ?, ?)"
      await db.query(userc, [nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance])
      return res.json({ message: "Utilisateur créé", data: userc })
  } catch (err) {
    res.status(500).json({ message: "Erreur BDD", error: err })
  }
}

exports.updateUser = async (res, res) => {
  let { id } = parseInt(req.params)

  if (!id) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  try {
    let query = 'SELECT * FROM t_user WHERE id_t_user = ?'
    await db.query(query, [id])
    if (user === null) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
    }

    query = 'UPDATE t_user SET ? WHERE id_t_user = ?'
    await db.query(query, [req.body, id])
    return res.json({ message: 'Utilisateur modifié', data: user })    
  } catch (err) {
    res.status(500).json({ message: 'Erreur BDD', error: err })
  }
}

exports.deleteUser = (req, res) => {
  let { id } = parseInt(req.params)

  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" })
  }

  let query = "DELETE FROM t_user WHERE id_t_user = ?"
  db.query(query, [id])
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Erreur BDD", error: err })
    )
}