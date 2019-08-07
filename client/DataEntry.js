import React, { useState } from 'react';
import {Button, Dropdown} from 'react-materialize';

export default function DataEntry(props) {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <div>
      <div className = 'container-fluid'>
        <div className = 'row'>
          <p style = {{paddingTop: '5px'}} className = 'col 2'>Enter New Expense</p>
          <input style = {{paddingTop: '20px'}} value = {props.newExpense.amount} onChange = {(e) => props.handleAmountChange(e)} className = 'col 1' style = {{width: '100px', paddingRight: '30px', paddingLeft: '30px'}} type="number" placeholder='amount' />
          <div className = 'col 1'></div>
          <p style = {{paddingTop: '5px'}} className = 'col 2'>Name of expense</p>
          <input style = {{paddingTop: '20px'}} value = {props.newExpense.name} onChange = {(e) => props.handleNameChange(e)} className = 'col 1' style = {{width: '100px', paddingRight: '30px', paddingLeft: '30px'}} type="text" placeholder='name' />
          <div className = 'col 1'></div>
          <div  style = {{paddingTop: '20px'}} className = 'col 1'>
            <Dropdown trigger = {<Button className = 'blue'>{props.newExpense.category}</Button>}>
              {props.categories.map((item) => <a key = {item} onClick = {(e) => props.categoryPicker(e)}>{item}</a>)}
            </Dropdown>
          </div>
          <div className = 'col 1'></div>
          <div className = 'col 2'>
            <p >Date: {props.newExpense.date}</p>
            <input onChange = {(e)=>props.changeDate(e)} type="month"></input>
          </div>
          <div style = {{paddingTop: '20px'}} className = 'col 1'>
            <Button className = 'blue' onClick = {() => {props.submitExpense()}}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
