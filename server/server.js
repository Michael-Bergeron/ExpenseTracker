const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const path = require('path');
const db = require('./db.js');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cookieParser())

app.post('/newExpense', (req, res) => {
  db.newExpense(req.body, (response)=> {
    res.send('success')
  })
})

app.get('/getAll', (req, res) => {
  db.getAll(req.query, (response) => {
    res.send(response);
  })
})

app.get('/logout', (req, res) => {
  res.cookie('ExpenseTracker', req.cookies.ExpenseTracker, {maxAge: 0});
	res.cookie('ExpenseTracker', crypto.randomBytes(20).toString('hex')).send('success')
})

app.get('/checkCookie', (req, res) => {
  db.checkCookie(req.cookies.ExpenseTracker, (login) => {
    res.send(login);
  })
})

app.post('/newAccount', (req, res) => {
  let newCookie = crypto.randomBytes(20).toString('hex');
  res.cookie('ExpenseTracker', newCookie);
  db.newAccount(req.body, newCookie, (response) => {
    res.send(response);
  })
})

app.get('/login', (req, res) => {
  let newCookie = crypto.randomBytes(20).toString('hex');
  res.cookie('ExpenseTracker', newCookie);
  db.login(req.query, newCookie, (response) => {
    res.send(response);
  })
})

app.post('/deleteItem', (req, res) => {
  db.deleteItem(req.body.date, req.body.name, req.body.price, () => {
    res.send('success')
  })
})

app.listen(3000, ()=>console.log('listening on port 3000'));