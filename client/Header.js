import React from 'react'

export default function Header(props) {
  const headerStyle = {
    height: '150px', width: '100%', 'backgroundImage': 'linear-gradient(135deg, #000428, #004e92)'
  }
  return (
    <div style = {headerStyle}>
      <span style = {{position: 'relative', left: '5%', top: '30px', fontSize: '50px', color: 'white'}}>SmartMoney</span>
    </div>
  )
}
