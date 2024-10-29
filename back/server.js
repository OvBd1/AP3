const express = require('express');
const cors = require('cors');
const medsRoute = require('./routes/medsRoute');
const app = express();

app.use(cors());

app.use('/api/film', filmRoute)
app.use('/api/user', UserRoute)

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})