import db from '../db.config.js'

export function getAllcategories(req, res) {
	db.query("SELECT * FROM `categorie`")
		.then((categories) => {
			res.json(categories[0])
		})
		.catch((err) => {
			console.error('Erreur SQL:', err)
			res.status(500).json({ message: "Erreur BDD", error: err.toString() })
		})
}