const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log("app listening on port 3000...")
})
