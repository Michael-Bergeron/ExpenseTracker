import React, { Component } from 'react';
import Login from './Login';
import DataEntry from './DataEntry';
import Graphs from './Graphs';
import Header from './Header';
import NavBar from './NavBar';
import Details from './Details'
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'home',
      login: 'michael',
      newExpense: {
        amount: 0,
        category: 'Category',
        date: 'August 2019',
        name: ''
      },
      currentDetails: {},
      categories: ['House Bills', 'Car Bills', 'Eating Out', 'Groceries', 'Tech Purchases', 'Entertainement', 'Education', 'Shopping', 'Other'],
      data: [{}],
      budget: 3000,
      months: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    }
  }

componentDidMount() {
  axios.get('/getAll', {params: {username: this.state.login}})
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
    console.log(currentDetails)
    console.log('data', newData)
    newData.sort((a, b) => {return this.state.months.indexOf(b.date.split(' ')[0]) - this.state.months.indexOf(a.date.split(' ')[0])})
    this.setState({data: newData, currentDetails})
  })
}

categoryPicker(e) {
  let {newExpense} = this.state;
  newExpense.category = e.target.innerHTML;
  this.setState({newExpense});
}

submitExpense() {
  if (this.state.newExpense.category !== 'Category'){
    let {newExpense, login} = this.state;
    axios.post('/newExpense', {login, newExpense})
    .then((response) => {
      newExpense.amount = 0;
      newExpense.name = '';
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
  this.setState({newExpense})
}

changePage(string) {
  this.setState({page: string})
}

  render() {
    return (
      <>
      {this.state.login == '' ? (<><Login /></>) : (
        <>
            <Header />
            <NavBar changePage = {this.changePage.bind(this)}/>
        {this.state.page === 'home' ? (
          <>
            <DataEntry 
              newExpense = {this.state.newExpense}
              categories = {this.state.categories}
              categoryPicker = {this.categoryPicker.bind(this)}
              submitExpense = {this.submitExpense.bind(this)}
              handleAmountChange = {this.handleAmountChange.bind(this)} 
              changeDate = {this.changeDate.bind(this)} 
              handleNameChange = {this.handleNameChange.bind(this)}/>
            <Graphs data = {this.state.data}/>
          </>) : (
            <>
              <Details 
                currentDetails = {this.state.currentDetails}
                data = {this.state.data}
              />
            </>
          )}
        </>)}
      </>
    )
  }
}
