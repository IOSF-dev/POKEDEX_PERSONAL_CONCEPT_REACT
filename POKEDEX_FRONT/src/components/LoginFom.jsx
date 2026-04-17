import React from 'react'

const LoginFom = () => {
  return (
    <div className='login_DIV'>
      <div className='login_box'>
        <input className='CUENTA' type="text" placeholder="Email-Pokemon"/>
        <input className='CLAVE' type="password" placeholder="Password "  />
        <button className='BOTONSUBMIT'>LOGIN</button>
      </div>

    </div>
  )
}

export default LoginFom