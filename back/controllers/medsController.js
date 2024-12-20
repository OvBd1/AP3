const db = require('../database/database')

exports.addMed = async (req, res) => {
  try {
    console.log('addMed')
    const { name, price } = req.body
    const rows = await db.pool.query('INSERT INTO meds (name, price) VALUES (?, ?)', [name, price])
    res.status(200).json({ message: 'Med added' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}