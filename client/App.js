import React, { Component } from 'react';
import Login from './Login';
import DataEntry from './DataEntry';
import Graphs from './Graphs';
import Header from './Header';
import NavBar from './NavBar';
import Details from './Details'
import axios from 'axios';
import Comparison from './Comparison.js';
import Budget from './Budget.js'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'home',
      date: '2019-08',
      login: '',
      loginError: '',
      yearData: {},
      monthlyTotals: {},
      newExpense: {
        amount: 0,
        category: 'Category',
        date: 'August 2019',
        name: ''
      },
      currentDetails: {},
      categories: ['House Bills', 'Car Bills', 'Eating Out', 'Groceries', 'Tech Purchases', 'Entertainement', 'Education', 'Shopping', 'Other'],
      data: [{}],
      comparison: {},
      budget: 3500,
      months: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    }
  }

  componentDidMount() {
    axios.get('/checkCookie')
    .then((data) => {
      this.setState({login: data.data})
      this.getAllItems(data.data);
    })
  }

  getAllItems(username) {
    axios.get('/getAll', {params: {username}})
    .then((data) => {
      let totalAmounts = {};
      let currentDetails = {};
      for (let i = 0; i < data.data.length; i++){
        if (!totalAmounts[data.data[i].date]){
          totalAmounts[data.data[i].date] = {}
          currentDetails[data.data[i].date] = {}
        }
        if (!totalAmounts[data.data[i].date][data.data[i].category]){
          totalAmounts[data.data[i].date][data.data[i].category] = 0;
          currentDetails[data.data[i].date][data.data[i].category] = [];
        }
        totalAmounts[data.data[i].date][data.data[i].category] += data.data[i].amount;
        currentDetails[data.data[i].date][data.data[i].category].push([data.data[i].name, data.data[i].amount]);
      }
      let newData = [];
      let totalByCategory = {'House Bills': 0, 'Car Bills': 0, 'Eating Out': 0, 'Groceries': 0, 'Tech Purchases': 0, 'Entertainement': 0, 'Education': 0, 'Shopping': 0, 'Other': 0};
      let monthlyTotals = {labels: [], data: []}
      let yearData = {amounts: [], labels: []};
      for (let key in totalAmounts){
        let amounts = new Array(9).fill(0);
        let categories = this.state.categories;
        for (let category in totalAmounts[key]){
          for (let i = 0; i < categories.length; i++){
            if (categories[i] === category){
              amounts[i] = totalAmounts[key][category];
            }
          }
        }
        newData.push({date: key, amounts: amounts, categories: categories});
      }
      for (let month in newData) {
        let total = 0;
        for (let i = 0; i < newData[month].categories.length; i++){
          totalByCategory[newData[month].categories[i]] += newData[month].amounts[i];
          total += newData[month].amounts[i];
        }
        monthlyTotals.labels.push(newData[month].date);
        monthlyTotals.data.push(total);
      }
      for (let category in totalByCategory){
        yearData.labels.push(category);
        yearData.amounts.push(totalByCategory[category]);
      }
      newData.sort((a, b) => {return this.state.months.indexOf(b.date.split(' ')[0]) - this.state.months.indexOf(a.date.split(' ')[0])})
      newData.reverse();
      monthlyTotals.data.reverse();
      monthlyTotals.labels.reverse();
      this.setState({data: newData, currentDetails, yearData, monthlyTotals})
    })
  }

  categoryPicker(e) {
    let {newExpense} = this.state;
    newExpense.category = e.target.innerHTML;
    this.setState({newExpense});
  }

  deleteItem(date, name, price, cat, index) {
    axios.post('/deleteItem', {date, name, price})
    .then(()=> {
      let { currentDetails } = this.state;
      currentDetails[date][cat].splice(index, 1);
      this.setState({currentDetails})
    })
  }

  submitExpense() {
    if (this.state.newExpense.category !== 'Category'){
      let {newExpense, login} = this.state;
      axios.post('/newExpense', {login, newExpense})
      .then((response) => {
        newExpense.amount = 0;
        newExpense.name = '';
        this.getAllItems(this.state.login)
        this.setState({newExpense})})
    }
  }

  handleAmountChange(e) {
    let {newExpense} = this.state;
    newExpense.amount = e.target.value;
    this.setState({newExpense})
  }

  handleNameChange(e) {
    let {newExpense} = this.state;
    newExpense.name = e.target.value;
    this.setState({newExpense})
  }

  changeDate(e) {
    let months = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'}
    let {newExpense} = this.state;
    let temp = e.target.value.split('-').reverse()
    newExpense.date = months[temp[0]] + ' ' + temp[1];
    this.setState({newExpense, date: e.target.value})
  }

  changePage(string) {
    this.setState({page: string})
  }

  logout() {
    axios.get('/logout')
    .then(()=> this.setState({login: ''}))
  }

  login(username, password) {
    if (username.length < 4 || password.length < 4){
      this.setState({loginError: 'username and password must be at least 4 characters'})
    } else {
    axios.get('/login', {params: {username, password}})
    .then((response) => {
      if (response.data === 'Logged In') {
        this.setState({login: username, loginError: ''});
        this.getAllItems(username);
      } else {
        this.setState({loginError: response.data})
      }
    })
  }
  }

  newAccount(username, password) {
    if (username.length < 4 || password.length < 4){
      this.setState({loginError: 'username and password must be at least 4 characters'})
    } else {
    axios.post('/newAccount', {username, password})
    .then((response) => {
      if (response.data === 'Logged In') {
        this.setState({login: username, loginError: ''});
        this.getAllItems(username);
        } else {
          this.setState({loginError: response.data})
        }
      })
    }
  }

  submitComparison(month1, month2) {
    let months = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'}
    let temp = month1.split('-').reverse()
    let newMonth1 = months[temp[0]] + ' ' + temp[1];
    temp = month2.split('-').reverse()
    let newMonth2 = months[temp[0]] + ' ' + temp[1];
    let { comparison } = this.state;
    comparison.month1 = {};
    comparison.month2 = {};
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].date === newMonth1){
        comparison.month1.date = newMonth1;
        comparison.month1.amounts = this.state.data[i].amounts;
        comparison.month1.categories = this.state.data[i].categories;
      }
      if (this.state.data[i].date === newMonth2){
        comparison.month2.date = newMonth2;
        comparison.month2.amounts = this.state.data[i].amounts;
        comparison.month2.categories = this.state.data[i].categories;
      }
    }
    if (!comparison.month1.date || !comparison.month2.date){
      return;
    }
    this.setState({comparison});
  }

  render() {
    return (
      <>
      {this.state.login == '' ? (<>
      <Login newAccount = {this.newAccount.bind(this)} login = {this.login.bind(this)} loginError = {this.state.loginError}/>
      </>) : (
        <>
            <Header />
            <NavBar changePage = {this.changePage.bind(this)} logout = {this.logout.bind(this)} page = {this.state.page}/>
        {this.state.page === 'home' ? (
          <>
            <DataEntry 
              newExpense = {this.state.newExpense}
              categories = {this.state.categories}
              categoryPicker = {this.categoryPicker.bind(this)}
              submitExpense = {this.submitExpense.bind(this)}
              handleAmountChange = {this.handleAmountChange.bind(this)} 
              changeDate = {this.changeDate.bind(this)} 
              handleNameChange = {this.handleNameChange.bind(this)}
              date = {this.state.date} />
            <Graphs yearData = {this.state.yearData} 
                    data = {this.state.data} 
                    monthlyTotals = {this.state.monthlyTotals}
            />
          </>) : (<></>)}
          {this.state.page === 'Comparison' ? (<>
          <Comparison comparison = {this.state.comparison} submitComparison={this.submitComparison.bind(this)} />
          </>) : (<></>)}
          {this.state.page === 'Detailed Expenses' ? ( <>
              <Details 
                currentDetails = {this.state.currentDetails}
                data = {this.state.data}
                deleteItem = {this.deleteItem.bind(this)}
                monthlyTotals = {this.state.monthlyTotals}
              />
            </>) : (<></>)}
          {this.state.page === 'Budget' ? (
            <Budget 
              budget = {this.state.budget}
            />
          ) : (<></>)}
        </>)}
      </>
    )
  }
}
