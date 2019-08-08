import React, { useState } from 'react';
import {Button, Table} from 'react-materialize';

export default function Comparison(props) {
  const [month1, setMonth1] = useState('2019-08');
  const [month2, setMonth2] = useState('2019-07');
  return (
    <div className = 'container'>
      <div className = 'row'>
        <p style = {{fontSize: '30px'}} className = 'center'>Compare Expenses from 2 months</p>
      </div>
      <div style = {{position: 'relative', left: '-50px', width: '300px', height: '270px'}} className = 'card'>
        <div className = 'row'>
          <p style = {{paddingTop: '20px'}} className = 'center'>Month 1</p>
          <div className = 'center'>
            <input style = {{position: 'relative', top: '20px'}}onChange = {(e)=>setMonth1(e.target.value)} type="month" value = {month1}></input>
          </div>
          <p style = {{paddingTop: '20px'}} className = 'center'>Month 2</p>
          <div className = 'center'>
            <input style = {{position: 'relative', top: '20px'}}onChange = {(e)=>setMonth2(e.target.value)} type="month" value = {month2}></input>
          </div>
        </div>
        <div style = {{paddingTop: '10px'}} className = 'center'>
          <Button style = {{backgroundColor: '#022d64'}} onClick = {() => {props.submitComparison(month1, month2)}}>Submit</Button>
        </div>
        </div>
      <div>
        {props.comparison.month1 ? (
          <div style = {{position: 'absolute', top: '300px', left: '600px'}} className = 'card'>
            <thread>
              <tr>
                <th style = {{width: '100px'}}>Category</th>
                <th style = {{width: '100px'}}>{props.comparison.month1.date}</th>
                <th style = {{width: '100px'}}>{props.comparison.month2.date}</th>
                <th style = {{width: '100px'}}>Difference</th>
              </tr>
            </thread>
            {props.comparison.month1.amounts.map((item, index) => 
            <tbody>
              <tr>
                <td style = {{width: '100px'}}>{props.comparison.month1.categories[index]}</td>
                <td style = {{width: '100px'}}>{props.comparison.month1.amounts[index]}</td>
                <td style = {{width: '100px'}}>{props.comparison.month2.amounts[index]}</td>
                {props.comparison.month1.amounts[index] - props.comparison.month2.amounts[index] >= 0 ? (
                  <td style = {{color: 'red'}}>{props.comparison.month1.amounts[index] - props.comparison.month2.amounts[index]}</td>) : (
                  <td style = {{color: 'green'}}>{props.comparison.month1.amounts[index] - props.comparison.month2.amounts[index]}</td>
                  )}
                
              </tr>
            </tbody>
            )}
            </div>
        ) : (<></>)}
      </div>
    </div>
  )
}
