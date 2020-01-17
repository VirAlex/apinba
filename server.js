const express = require('express')
const app = express()
const games = require('./routes/games');
const port = 3000

app.get('/', function (req, res) {
  res.send('Hello Universe')
})


app.use('/api/v1/games', games);

app.listen(port, () => console.log(`Server Starter on http:localhost:${port}`));
