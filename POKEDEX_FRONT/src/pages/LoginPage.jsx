import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import LoginFom from '../components/LoginFom'

const LoginPage = () => {
  return (
    <>
    <main className='main_LOG'>
 <HeaderComponent/>
    <LoginFom/>
    <footer className='footer_LOG'><div className='GIF'></div></footer>

    </main>
   
    </>
  )
}

export default LoginPage