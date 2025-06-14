import db from '../db.config.js'

export function getAllProducts(req, res) {
	db.query("SELECT * FROM `produit`")
		.then((products) => {
			res.json(products[0])
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
		return res.json(produit[0])
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

export async function addProduct(req, res) {
	let { nom_produit, description, forme, dosage, prix, image, restriction, conservation, stock } = req.body
	
	if (!nom_produit || !description || !forme || !dosage || !prix || !stock ) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	try {
		let produit = await db.query(
			'INSERT INTO produit (nom_produit, description, forme, dosage, prix, image_url, restriction, conservation, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[nom_produit, description, forme, dosage, prix, image, restriction, conservation, stock]
		)
		return res.json({ message: 'Produit ajouté' })
	} catch (err) {
		res.status(500).json({ message: "Erreur BDD", error: err })
	}
}

export async function updateProduct(req, res) {
	let productId = parseInt(req.params.id)

	let { nom_produit, description, forme, dosage, prix, stock } = req.body

	if (!productId) {
		return res.status(400).json({ message: 'Il manque un paramètre' })
	}

	try {
		let product = await db.query('SELECT * FROM produit WHERE id_produit = ?', [productId])
		if (product[0].length === 0) {
			return res.status(404).json({ message: 'Produit n\'existe pas' })
		}

		let productUpdate = await db.query(
			'UPDATE produit SET nom_produit = ?, description = ?, forme = ?, dosage = ?, prix = ?, stock = ? WHERE id_produit = ?',
			[nom_produit, description, forme, dosage, prix, productId, stock]
		)
		return res.json({ message: 'Produit modifié' })    
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Erreur BDD', error: err })
	}
}

export async function updateStock(req, res) {
	let productId = parseInt(req.params.id)
	let { stock } = req.body

	if (!productId || stock === undefined) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	try {
		let product = await db.query('SELECT * FROM produit WHERE id_produit = ?', [productId])
		if (product[0].length === 0) {
			return res.status(404).json({ message: 'Produit n\'existe pas' })
		}

		await db.query('UPDATE produit SET stock = ? WHERE id_produit = ?', [stock, productId])
		return res.json({ message: 'Stock modifié' })
	} catch (err) {
		res.status(500).json({ message: 'Erreur BDD', error: err })
	}
}

export function deleteProduct(req, res) {
	let productId  = parseInt(req.params.id)

	if (!productId) {
		return res.status(400).json({ message: "Il manque un paramètre" })
	}

	db.query("DELETE FROM produit WHERE id_produit = ?", [productId])
		.then(() => res.status(204).json({}))
		.catch((err) =>
			res.status(500).json({ message: "Erreur BDD", error: err })
		)
}