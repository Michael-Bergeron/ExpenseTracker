const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const path = require('path');
const db = require('./db.js')
const app = express();

app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/newExpense', (req, res) => {
  db.newExpense(req.body, (response)=> {
    res.send('success')
  })
})

app.get('/getAll', (req, res) => {
  db.getAll(req.query, (response) => {
    res.send(response)
  })
})

app.listen(3000, ()=>console.log('listening on port 3000'));