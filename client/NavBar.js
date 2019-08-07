import React from 'react';
import {Navbar, NavItem} from 'react-materialize';

export default function NavBar(props) {
  return (
    <div style ={{backgroundColor: 'black'}}>
    <Navbar className = 'black' alignLinks="left">
      <NavItem onClick = {()=> props.changePage('home')}>
        Enter New Expense
      </NavItem>
      <NavItem onClick = {()=> props.changePage('Detailed Expenses')}>
        Detailed Expenses
      </NavItem>
    </Navbar>
    </div>
  )
}
