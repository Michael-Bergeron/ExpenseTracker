import React, { useState } from 'react';
import {Button, Dropdown} from 'react-materialize';

export default function DataEntry(props) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(' Category ');
  return (
    <div>
      <div style = {{position: 'relative', width: '300px', paddingLeft: '50px'}} className = 'container-fluid'>
        <div style = {{paddingBottom: '30px'}}className = 'card'>
          <p style = {{paddingTop: '5px', fontWeight: 'bold'}} className = 'center'>Enter New Expense</p>
          <div style = {{width: '200px', paddingLeft: '30px'}}>
            <input className = 'center' value = {amount} onChange = {(e) => setAmount(e.target.value)} type="number" placeholder='amount' />
          </div>
          <p style = {{paddingTop: '5px'}} className = 'center'>Name of expense</p>
          <div style = {{width: '200px', paddingLeft: '30px'}}>
            <input value = {name} onChange = {(e) => setName(e.target.value)} className = 'center' type="text" placeholder='name' />
          </div>
          <div className = 'col 1'></div>
          <div  style = {{paddingTop: '20px'}} className = 'center'>
            <Dropdown trigger = {<Button style = {{backgroundColor: '#022d64'}}>{category}</Button>}>
              {props.categories.map((item) => <a style = {{color: '#022d64'}} key = {item} onClick = {(e) => setCategory(item)}>{item}</a>)}
            </Dropdown>
          </div>
          <div className = 'center'></div>
          <div style = {{width: '200px', paddingLeft: '30px'}}>
            <input style = {{position: 'relative', top: '20px'}} onChange = {(e)=>props.changeDate(e)} type="month" value = {props.date}></input>
          </div>
          <div style = {{paddingTop: '40px'}} className = 'center'>
            <Button style = {{backgroundColor: '#022d64'}} onClick = {() => props.submitExpense(name, amount, category)}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
