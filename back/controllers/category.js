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

export async function getCategory(req, res) {
	let categoryId = parseInt(req.params.id)

	if (!categoryId) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	try {
		let category = await db.query("SELECT * FROM `categorie` WHERE id_categorie = ?", [categoryId])
		if (category === null) {
			return res.status(404).json({ message: "Categorie n'existe pas" })
		}
		return res.json(category[0])
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}