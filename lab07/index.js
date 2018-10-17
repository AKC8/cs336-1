const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static(__dirname + '/public'));

app.get('/hello', (req, res) => res.send(`Hello ${req.query.name}`))

app.get('/', (req, res) => res.sendFile(__dirname + '/public/lab07.html'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
