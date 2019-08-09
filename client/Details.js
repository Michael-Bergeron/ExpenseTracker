import React, { useState } from 'react';
import { Collapsible, CollapsibleItem, Button, Dropdown } from 'react-materialize';

export default function Details(props) {
  const [month, setMonth] = useState('August 2019');
  return (
    <div className = 'container'>
      <div style = {{position: 'absolute', left: '-50px', top: '235px'}}>
        <Dropdown trigger = {<Button style = {{position: 'relative', left: '110px', backgroundColor: '#022d64'}}>{month}</Button>}>
          {props.monthlyTotals.labels.map((month) => 
          <a key = {month} style = {{color: '#022d64'}} onClick = {(e) => setMonth(month)}>{month}</a>
          )}
        </Dropdown>
      </div>
      <Collapsible accordion={false}>
        {props.data[0].categories.map((item, index) => 
        <>
          <CollapsibleItem onSelect={()=>{}} header = {`${item}`}>
            {props.currentDetails[month][item] ? (
              <>
              {props.currentDetails[month][item].map((detail, index2) => 
              <>
                <p style={{paddingLeft: '50px'}}>Name of Expense: {detail[0]}
                  <span style = {{position: 'absolute', left: '60%'}}>${detail[1]}</span>
                  <img onClick = {() => props.deleteItem(month, detail[0], detail[1], item, index2)} className = 'deleteicon' style = {{position: 'absolute', left: '80%'}} height = '15' src="./assets/trashcan.png"/>
                </p>
              </>
            )}
              </>
            ) : (<></>)}
            <p style={{paddingLeft: '50px'}}>
              {props.data.map((newMonth) => 
                <>
                {newMonth.date === month ? (<span style = {{position: 'absolute', left: '54%'}}>Total Spent: ${newMonth.amounts[index]}</span>) : (<></>)}
                </>
              )}
            </p>
          </CollapsibleItem>
        </>
        )}
      </Collapsible>
    </div>
  )
}
