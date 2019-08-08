import React, { useState } from 'react';
import {Button} from 'react-materialize';

export default function Login(props) {
  const pageStyle = {position: 'absolute', width: '100%', height: '100%', 'backgroundImage': 'linear-gradient(135deg, #000428, #004e92)'}
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div style = {pageStyle}>
      {showLogin ? (
        <div className = 'container'>
          <div>
            <p style = {{fontSize: '60px', color: 'white'}}>SmartMoney</p>
        </div>
        <div style = {{position: 'relative', left: '280px', top: '0px', width: '400px', height: '400px', padding: '20px', 'background': 'white'}}>
          <p style = {{fontSize: '30px', textAlign: 'center'}} >Log In</p>
          <hr style = {{position: 'relative', width: '60%', top: '-20px'}}></hr>
          <p className = 'center'>Username</p>
          <input type="text" onChange = {(e) => setUsername(e.target.value.replace(/[^A-z\s]/g, ''))}/>
          {props.loginError === '' ? (<></>) : (<p style = {{color: 'red', fontSize: '10px'}}>{props.loginError}</p>)}
          <p className = 'center'>Password</p>
          <input type="password" onChange = {(e) => setPassword(e.target.value.replace(/[^A-z\s]/g, ''))}/>
          <Button style = {{backgroundColor: '#022d64'}} onClick = {() => {props.newAccount(username, password)}}>New Account</Button>
          <span style = {{paddingLeft: '120px'}}></span>
          <Button style = {{backgroundColor: '#022d64'}} onClick = {() => {props.login(username, password)}}>Login</Button>
        </div>
        </div>) : (
          <div style = {{position: 'aboslute', top: '250px', fontSize: '60px', color: 'white', textAlign: 'center'}}>
            <p>Welcome</p>
            <p>To</p>
            <p>SmartMoney</p>
            <Button style = {{color: 'black'}} className = 'white' onClick = {() => setShowLogin(true)}>Enter</Button>
          </div>)}
      
    </div>
  )
}
