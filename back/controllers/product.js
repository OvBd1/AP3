import db from '../db.config.js'

export function getAllProducts(req, res) {
	console.log('Requête getAllProducts reçue')
	db.query("SELECT * FROM `produit`")
		.then((products) => {
			console.log('Produits récupérés:', products[0])
			res.json({ data: products[0] })
		})
		.catch((err) => {
			console.error('Erreur SQL:', err)
			res.status(500).json({ message: "Erreur BDD", error: err.toString() })
		})
}

export async function getProduct(req, res) {
	let productId = parseInt(req.params.id)

	if (!productId) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	try {
		let produit = await db.query("SELECT * FROM produit WHERE id_produit = ?", [productId])
		if (produit === null) {
			return res.status(404).json({ message: "Produit n'existe pas" })
		}
		return res.json({ data: produit[0] })
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

export async function addProduct(req, res) {
	let { nom_produit, description, forme, dosage, prix, laboratoire_fabriquant } = req.body
	
	if (!nom_produit || !description || !forme || !dosage || !prix || !laboratoire_fabriquant) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	try {
		let produit = await db.query(
			'INSERT INTO produit (nom_produit, description, forme, dosage, prix, laboratoire_fabriquant) VALUES (?, ?, ?, ?, ?, ?)',
			[nom_produit, description, forme, dosage, prix, laboratoire_fabriquant]
		)
		return res.json({ message: 'Produit ajouté' })
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

export async function updateProduct(req, res) {
	let productId = parseInt(req.params.id)

	let { nom_produit, description, forme, dosage, prix, laboratoire_fabriquant } = req.body

	if (!productId) {
		return res.status(400).json({ message: 'Il manque un paramètre' })
	}

	try {
		let product = await db.query('SELECT * FROM produit WHERE id_produit = ?', [productId])
		if (product[0].length === 0) {
			return res.status(404).json({ message: 'Produit n\'existe pas' })
		}

		let productUpdate = await db.query(
			'UPDATE produit SET nom_produit = ?, description = ?, forme = ?, dosage = ?, prix = ?, laboratoire_fabriquant = ? WHERE id_produit = ?',
			[nom_produit, description, forme, dosage, prix, laboratoire_fabriquant, productId]
		)
		return res.json({ message: 'Produit modifié' })    
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Erreur BDD', error: err })
	}
}

export function deleteProduct(req, res) {
	let productId  = parseInt(req.params.id)

	if (!productId) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	db.query("DELETE FROM t_produit WHERE id_t_produit = ?", [productId])
		.then(() => res.status(204).json({}))
		.catch((err) =>
			res.status(500).json({ message: "Erreur BDD", error: err })
		)
}