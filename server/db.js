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
//   {username: 'michael', amount: 8, category: 'Eating Out', date: 'April 2019', name: 'McDonalds'},
//   {username: 'michael', amount: 10, category: 'Eating Out', date: 'April 2019', name: 'Canes'},
//   {username: 'michael', amount: 23, category: 'Eating Out', date: 'April 2019', name: 'Chuys'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'April 2019', name: 'Torchys'},
//   {username: 'michael', amount: 40, category: 'Eating Out', date: 'April 2019', name: 'SteakHouse'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'April 2019', name: 'Torchys'},
//   {username: 'michael', amount: 1950, category: 'House Bills', date: 'April 2019', name: 'Mortgage'},
//   {username: 'michael', amount: 180, category: 'Car Bills', date: 'April 2019', name: 'Insurance'},
//   {username: 'michael', amount: 500, category: 'Car Bills', date: 'April 2019', name: 'Payment'},
//   {username: 'michael', amount: 22, category: 'Car Bills', date: 'April 2019', name: 'Gas'},
//   {username: 'michael', amount: 21, category: 'Car Bills', date: 'April 2019', name: 'Gas'},
//   {username: 'michael', amount: 105, category: 'Groceries', date: 'April 2019', name: 'HEB'},
//   {username: 'michael', amount: 113, category: 'Groceries', date: 'April 2019', name: 'HEB'},
//   {username: 'michael', amount: 53, category: 'Groceries', date: 'April 2019', name: 'Trader Joes'},
//   {username: 'michael', amount: 150, category: 'Tech Purchases', date: 'April 2019', name: 'Amazon'},
//   {username: 'michael', amount: 11, category: 'Entertainement', date: 'April 2019', name: 'Movie'},
//   {username: 'michael', amount: 45, category: 'Entertainement', date: 'April 2019', name: 'Movie'},
//   {username: 'michael', amount: 55, category: 'Entertainement', date: 'April 2019', name: 'Basketball Game'},
//   {username: 'michael', amount: 150, category: 'Shopping', date: 'April 2019', name: 'Target'},
//   {username: 'michael', amount: 65, category: 'Tech Purchases', date: 'April 2019', name: 'Nike'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Torchys'},
//   {username: 'michael', amount: 43, category: 'Eating Out', date: 'March 2019', name: 'Steakhouse'},
//   {username: 'michael', amount: 43, category: 'Eating Out', date: 'March 2019', name: 'Steakhouse'},
//   {username: 'michael', amount: 43, category: 'Eating Out', date: 'March 2019', name: 'Steakhouse'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'March 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 7, category: 'Eating Out', date: 'March 2019', name: 'Torchys'},
//   {username: 'michael', amount: 1950, category: 'House Bills', date: 'March 2019', name: 'Mortgage'},
//   {username: 'michael', amount: 150, category: 'House Bills', date: 'March 2019', name: 'Repairs'},
//   {username: 'michael', amount: 200, category: 'Car Bills', date: 'March 2019', name: 'Insurance'},
//   {username: 'michael', amount: 500, category: 'Car Bills', date: 'March 2019', name: 'Payment'},
//   {username: 'michael', amount: 17, category: 'Car Bills', date: 'March 2019', name: 'Gas'},
//   {username: 'michael', amount: 31, category: 'Car Bills', date: 'March 2019', name: 'Gas'},
//   {username: 'michael', amount: 31, category: 'Car Bills', date: 'March 2019', name: 'Gas'},
//   {username: 'michael', amount: 22, category: 'Car Bills', date: 'March 2019', name: 'Gas'},
//   {username: 'michael', amount: 85, category: 'Groceries', date: 'March 2019', name: 'HEB'},
//   {username: 'michael', amount: 123, category: 'Groceries', date: 'March 2019', name: 'HEB'},
//   {username: 'michael', amount: 33, category: 'Groceries', date: 'March 2019', name: 'Trader Joes'},
//   {username: 'michael', amount: 250, category: 'Tech Purchases', date: 'March 2019', name: 'Amazon'},
//   {username: 'michael', amount: 25, category: 'Tech Purchases', date: 'March 2019', name: 'Amazon'},
//   {username: 'michael', amount: 200, category: 'Shopping', date: 'March 2019', name: 'Target'},
//   {username: 'michael', amount: 150, category: 'Shopping', date: 'March 2019', name: 'Target'},
//   {username: 'michael', amount: 150, category: 'Shopping', date: 'March 2019', name: 'Target'},
//   {username: 'michael', amount: 80, category: 'Tech Purchases', date: 'March 2019', name: 'Nike'},
//   {username: 'michael', amount: 10, category: 'Eating Out', date: 'February 2019', name: 'Canes'},
//   {username: 'michael', amount: 23, category: 'Eating Out', date: 'February 2019', name: 'Chuys'},
//   {username: 'michael', amount: 22, category: 'Eating Out', date: 'February 2019', name: 'Happy Chick'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'February 2019', name: 'Torchys'},
//   {username: 'michael', amount: 40, category: 'Eating Out', date: 'February 2019', name: 'SteakHouse'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'February 2019', name: 'Torchys'},
//   {username: 'michael', amount: 1950, category: 'House Bills', date: 'February 2019', name: 'Mortgage'},
//   {username: 'michael', amount: 180, category: 'Car Bills', date: 'February 2019', name: 'Insurance'},
//   {username: 'michael', amount: 500, category: 'Car Bills', date: 'February 2019', name: 'Payment'},
//   {username: 'michael', amount: 22, category: 'Car Bills', date: 'February 2019', name: 'Gas'},
//   {username: 'michael', amount: 21, category: 'Car Bills', date: 'February 2019', name: 'Gas'},
//   {username: 'michael', amount: 35, category: 'Car Bills', date: 'February 2019', name: 'Gas'},
//   {username: 'michael', amount: 85, category: 'Groceries', date: 'February 2019', name: 'HEB'},
//   {username: 'michael', amount: 105, category: 'Groceries', date: 'February 2019', name: 'HEB'},
//   {username: 'michael', amount: 113, category: 'Groceries', date: 'February 2019', name: 'HEB'},
//   {username: 'michael', amount: 53, category: 'Groceries', date: 'February 2019', name: 'Trader Joes'},
//   {username: 'michael', amount: 150, category: 'Tech Purchases', date: 'February 2019', name: 'Amazon'},
//   {username: 'michael', amount: 11, category: 'Entertainement', date: 'February 2019', name: 'Movie'},
//   {username: 'michael', amount: 45, category: 'Entertainement', date: 'February 2019', name: 'Movie'},
//   {username: 'michael', amount: 55, category: 'Entertainement', date: 'February 2019', name: 'Basketball Game'},
//   {username: 'michael', amount: 150, category: 'Shopping', date: 'February 2019', name: 'Target'},
//   {username: 'michael', amount: 65, category: 'Tech Purchases', date: 'February 2019', name: 'Nike'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Torchys'},
//   {username: 'michael', amount: 43, category: 'Eating Out', date: 'January 2019', name: 'Steakhouse'},
//   {username: 'michael', amount: 43, category: 'Eating Out', date: 'January 2019', name: 'Steakhouse'},
//   {username: 'michael', amount: 43, category: 'Eating Out', date: 'January 2019', name: 'Steakhouse'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'January 2019', name: 'Torchys'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'January 2019', name: 'Torchys'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'January 2019', name: 'Torchys'},
//   {username: 'michael', amount: 12, category: 'Eating Out', date: 'January 2019', name: 'Torchys'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 11, category: 'Eating Out', date: 'January 2019', name: 'Chick Fil A'},
//   {username: 'michael', amount: 7, category: 'Eating Out', date: 'January 2019', name: 'Torchys'},
//   {username: 'michael', amount: 1950, category: 'House Bills', date: 'January 2019', name: 'Mortgage'},
//   {username: 'michael', amount: 200, category: 'Car Bills', date: 'January 2019', name: 'Insurance'},
//   {username: 'michael', amount: 500, category: 'Car Bills', date: 'January 2019', name: 'Payment'},
//   {username: 'michael', amount: 31, category: 'Car Bills', date: 'January 2019', name: 'Gas'},
//   {username: 'michael', amount: 31, category: 'Car Bills', date: 'January 2019', name: 'Gas'},
//   {username: 'michael', amount: 22, category: 'Car Bills', date: 'January 2019', name: 'Gas'},
//   {username: 'michael', amount: 85, category: 'Groceries', date: 'January 2019', name: 'HEB'},
//   {username: 'michael', amount: 123, category: 'Groceries', date: 'January 2019', name: 'HEB'},
//   {username: 'michael', amount: 33, category: 'Groceries', date: 'January 2019', name: 'Trader Joes'},
//   {username: 'michael', amount: 250, category: 'Tech Purchases', date: 'January 2019', name: 'Amazon'},
//   {username: 'michael', amount: 25, category: 'Tech Purchases', date: 'January 2019', name: 'Amazon'},
//   {username: 'michael', amount: 25, category: 'Tech Purchases', date: 'January 2019', name: 'Amazon'},
//   {username: 'michael', amount: 15, category: 'Entertainement', date: 'January 2019', name: 'Movie'},
//   {username: 'michael', amount: 200, category: 'Shopping', date: 'January 2019', name: 'Target'},
//   {username: 'michael', amount: 150, category: 'Shopping', date: 'January 2019', name: 'Target'},
//   {username: 'michael', amount: 80, category: 'Tech Purchases', date: 'January 2019', name: 'Nike'},
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

const newAccount = (creds, cookie, cb) => {
  userList.find({username: creds.username})
  .then((data) => {
    if (data.length === 0){
      bcrypt.hash(creds.password, saltRounds, function(err, hash) {
        let newUser = new userList({
          username: creds.username,
          cookie: cookie,
          password: hash
        })
        newUser.save(() => cb('Logged In'))
      });
    } else {cb('username exists')}
  })
}

const login = (creds, cookie, cb) => {
  userList.find({username: creds.username})
  .then((data => {
    if (data.length === 0){
      cb('username or password is incorrect');
    } else {
      bcrypt.compare(creds.password, data[0].password, function(err, res) {
        if (res) {
          userList.updateOne({username: creds.username}, {cookie: cookie})
          .then(() => cb('Logged In'))
        } else {
          cb('username or password is incorrect');
        }
      });
    }
  }))
}

const checkCookie = (cookie, cb) => {
  userList.find({cookie})
  .then((data) => {
    if (data.length === 0) {
      cb('');
      return;
    } else {
      cb(data[0].username)
    }
  })
}

const deleteItem = (date, name, amount, cb) => {
  expenseList.deleteOne({date, name, amount})
  .then((res) => cb(res))
}

module.exports = { newExpense, getAll, newAccount, login, checkCookie, deleteItem }