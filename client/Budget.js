import React from 'react'

export default function Budget(props) {
  return (
    <div>
      <div style = {{position: 'relative', width: '400px', paddingLeft: '30px'}} className = 'card'>
        <p>Current Budget: ${props.budget}</p>
      </div>
    </div>
  )
}
