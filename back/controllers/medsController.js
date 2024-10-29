const db = require('../database/database')

exports.getAllMeds = async (req, res) => {
  try {
    console.log('getAllMeds')
    const rows = await db.pool.query('SELECT * FROM meds')
    console.log(rows)
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

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

exports.deleteMed = async (req, res) => {
  try {
    console.log('deleteMed')
    const { id } = req.params
    const rows = await db.pool.query('DELETE FROM meds WHERE id = ?', [id])
    res.status(200).json({ message: 'Med deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateMed = async (req, res) => {
  try {
    console.log('updateMed')
    const { id } = req.params
    const { name, price } = req.body
    const rows = await db.pool.query('UPDATE meds SET name = ?, price = ? WHERE id = ?', [name, price, id])
    res.status(200).json({ message: 'Med updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

