const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db.config.js')

const router = express.Router()

router.get('', (req, res) => {

  const query = 'SELECT * FROM t_user'
  db.query(query)
    .then(users => res.json({ data: users }))
    .catch(err => res.status(500).json({ message: 'Erreur BDD', error: err}))
})

router.get('/:id', (req, res) => {
  let {id} = parseInt(req.params)

  if (!id){
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  const query = 'SELECT * FROM t_user WHERE id_t_user = ?'
  db.query(query, [id])
    .then(user => {
      if (user === null) {
        return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
      }
      return res.json({ data: user })
    })
    .catch(err => res.status(500).json({ message: 'Erreur BDD', error: err}))
})

router.put("", (req, res) => {
	let { nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance} = req.body

	if (!nom || !prenom || !adresse_mail || !mdp) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	let query = "SELECT * FROM t_user WHERE adresse_mail = ?"
	db.query(query, [adresse_mail])
		.then((user) => {
			if (user === null) {
				return res.status(409).json({ message: `L'utilisateur ${user.nom} existe déjà` })
			}

			bcrypt.hash(mdp, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hash) => {
          mdp = hash
          let query = "INSERT INTO t_user (nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance) VALUES (?, ?, ?, ?, ?, ?, ?)"
          db.query(query, [nom, prenom, adresse_mail, mdp, adresse, num_tel, date_naissance])
            .then((result) => res.json({ message: "Utilisateur créé", data: result }))
            .catch((err) =>res.status(500).json({ message: "Erreur BDD", error: err }))
			  })
        .catch((err) => res.status(500).json({ message: "Erreur hash", error: err }))
		})
		.catch((err) =>res.status(500).json({ message: "Erreur BDD", error: err }))
})

router.patch('/:id', (req, res) => {
  let { id } = parseInt(req.params)

  if (!id) {
    return res.status(400).json({ message: 'Il manque un paramètre' })
  }

  let query = 'SELECT * FROM t_user WHERE id_t_user = ?'
  db.query(query, [id])
    .then(user => {
      if (user === null) {
        return res.status(404).json({ message: 'Utilisateur n\'existe pas' })
      }
      query = 'UPDATE t_user SET ? WHERE id_t_user = ?'
      db.query(query, [req.body, id])
        .then(result => res.json({ message: 'Utilisateur modifié' }))
        .catch(err => res.status(500).json({ message: 'Erreur BDD', error: err }))
    })
    .catch(err => res.status(500).json({ message: 'Erreur BDD', error: err }))
})

router.delete("/:id", (req, res) => {
  let { id } = parseInt(req.params);

  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }

  let query = "DELETE FROM t_user WHERE id_t_user = ?";
  db.query(query, [id])
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Erreur BDD", error: err })
    );
})

module.exports = router