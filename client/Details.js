import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';

export default function Details(props) {
  return (
    <div>
      <Collapsible accordion={false}>
        {props.data[0].categories.map((item, index) => 
        <>
          <CollapsibleItem header = {`Category: ${item} ---------Total Expenses: ${props.data[0].amounts[index]}`}>
            {props.currentDetails['August 2019'][item] ? (
              <>
              {props.currentDetails['August 2019'][item].map((detail) => 
              <>
                <p>Name of Expense: {detail[0]} ------ Price of Expense: {detail[1]}</p>
              </>
            )}
              </>
            ) : (<></>)}
          </CollapsibleItem>
        </>
        )}
      </Collapsible>
    </div>
  )
}
