import React from 'react';
import {Navbar, NavItem} from 'react-materialize';

export default function NavBar(props) {
  const clickedColor = {
    backgroundColor: '#696969'
  }
  return (
    <div style ={{backgroundColor: 'black'}}>
      <Navbar className = 'black' alignLinks="left">
        <NavItem style = {{backgroundColor: props.page === 'home' ? '#696969' : 'black'}} className = 'navbarLink' onClick = {()=> props.changePage('home')}>
          Enter New Expense
        </NavItem>
        <NavItem style = {{backgroundColor: props.page === 'Detailed Expenses' ? '#696969' : 'black'}} className = 'navbarLink' onClick = {()=> props.changePage('Detailed Expenses')}>
          Detailed Expenses
        </NavItem>
        <NavItem style = {{backgroundColor: props.page === 'Comparison' ? '#696969' : 'black'}} className = 'navbarLink' onClick = {()=> props.changePage('Comparison')}>
          Comparison
        </NavItem>
        <NavItem style = {{backgroundColor: props.page === 'Budget' ? '#696969' : 'black'}} className = 'navbarLink' onClick = {()=> props.changePage('Budget')}>
          Budget
        </NavItem>
        <NavItem style = {{position: 'absolute', left: '90%'}} onClick = {()=> props.logout()}>
          Logout
        </NavItem>
      </Navbar>
    </div>
  )
}
