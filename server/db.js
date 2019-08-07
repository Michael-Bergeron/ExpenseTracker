const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://localhost/ExpenseTracker');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  cookie: String,
  budget: Number
})

const expenseSchema = mongoose.Schema({
  username: String,
  amount: Number,
  category: String,
  date: String,
  name: String
})

const userList = mongoose.model('user', userSchema);
const expenseList = mongoose.model('expense', expenseSchema);

const newExpense = (items, cb) => {
  let addExpense = new expenseList({
    username: items.login,
    amount: items.newExpense.amount,
    category: items.newExpense.category,
    date: items.newExpense.date,
    name: items.newExpense.name
  })
  addExpense.save((res) => {cb(res)})
}

// let newData = [
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'August 2019', name: 'Torchys'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'August 2019', name: 'Canes'},
//   {username: 'michael', amount: 23, category: 'Eating Out', date: 'August 2019', name: 'Chuys'},
//   {username: 'michael', amount: 22, category: 'Eating Out', date: 'August 2019', name: 'Happy Chick'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'August 2019', name: 'Torchys'},
//   {username: 'michael', amount: 8, category: 'Eating Out', date: 'August 2019', name: 'SteakHouse'},
//   {username: 'michael', amount: 7, category: 'Eating Out', date: 'August 2019', name: 'Torchys'},
//   {username: 'michael', amount: 1950, category: 'House Bills', date: 'August 2019', name: 'Mortgage'},
//   {username: 'michael', amount: 350, category: 'House Bills', date: 'August 2019', name: 'Repairs'},
//   {username: 'michael', amount: 200, category: 'Car Bills', date: 'August 2019', name: 'Insurance'},
//   {username: 'michael', amount: 500, category: 'Car Bills', date: 'August 2019', name: 'Payment'},
//   {username: 'michael', amount: 25, category: 'Car Bills', date: 'August 2019', name: 'Gas'},
//   {username: 'michael', amount: 25, category: 'Car Bills', date: 'August 2019', name: 'Gas'},
//   {username: 'michael', amount: 25, category: 'Car Bills', date: 'August 2019', name: 'Gas'},
//   {username: 'michael', amount: 85, category: 'Groceries', date: 'August 2019', name: 'HEB'},
//   {username: 'michael', amount: 75, category: 'Groceries', date: 'August 2019', name: 'HEB'},
//   {username: 'michael', amount: 123, category: 'Groceries', date: 'August 2019', name: 'HEB'},
//   {username: 'michael', amount: 33, category: 'Groceries', date: 'August 2019', name: 'Trader Joes'},
//   {username: 'michael', amount: 300, category: 'Tech Purchases', date: 'August 2019', name: 'Amazon'},
//   {username: 'michael', amount: 20, category: 'Entertainement', date: 'August 2019', name: 'Movie'},
//   {username: 'michael', amount: 15, category: 'Entertainement', date: 'August 2019', name: 'Movie'},
//   {username: 'michael', amount: 150, category: 'Entertainement', date: 'August 2019', name: 'Football Game'},
//   {username: 'michael', amount: 200, category: 'Shopping', date: 'August 2019', name: 'Target'},
//   {username: 'michael', amount: 80, category: 'Tech Purchases', date: 'August 2019', name: 'Nike'},
//   {username: 'michael', amount: 8, category: 'Eating Out', date: 'July 2019', name: 'Torchys'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'July 2019', name: 'Canes'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'July 2019', name: 'Torchys'},
//   {username: 'michael', amount: 8, category: 'Eating Out', date: 'July 2019', name: 'SteakHouse'},
//   {username: 'michael', amount: 7, category: 'Eating Out', date: 'July 2019', name: 'Torchys'},
//   {username: 'michael', amount: 123, category: 'House Bills', date: 'July 2019', name: 'Repairs'},
//   {username: 'michael', amount: 200, category: 'Car Bills', date: 'July 2019', name: 'Insurance'},
//   {username: 'michael', amount: 500, category: 'Car Bills', date: 'July 2019', name: 'Payment'},
//   {username: 'michael', amount: 17, category: 'Car Bills', date: 'July 2019', name: 'Gas'},
//   {username: 'michael', amount: 31, category: 'Car Bills', date: 'July 2019', name: 'Gas'},
//   {username: 'michael', amount: 22, category: 'Car Bills', date: 'July 2019', name: 'Gas'},
//   {username: 'michael', amount: 85, category: 'Groceries', date: 'July 2019', name: 'HEB'},
//   {username: 'michael', amount: 123, category: 'Groceries', date: 'July 2019', name: 'HEB'},
//   {username: 'michael', amount: 33, category: 'Groceries', date: 'July 2019', name: 'Trader Joes'},
//   {username: 'michael', amount: 300, category: 'Tech Purchases', date: 'July 2019', name: 'Amazon'},
//   {username: 'michael', amount: 20, category: 'Entertainement', date: 'July 2019', name: 'Movie'},
//   {username: 'michael', amount: 15, category: 'Entertainement', date: 'July 2019', name: 'Movie'},
//   {username: 'michael', amount: 200, category: 'Shopping', date: 'July 2019', name: 'Target'},
//   {username: 'michael', amount: 150, category: 'Shopping', date: 'July 2019', name: 'Target'},
//   {username: 'michael', amount: 80, category: 'Tech Purchases', date: 'July 2019', name: 'Nike'},
// ]

// for (let i = 0; i < newData.length; i++){
//   let data = new expenseList(newData[i]);
//   data.save()
// }


const getAll = (items, cb) => {
  expenseList.find({username: items.username})
  .then((res) => {
    cb(res);
  })
}

module.exports = { newExpense, getAll }