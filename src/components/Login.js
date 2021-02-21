import React, {useState, useEffect} from 'react'
import Api from '../Api.js'
import './Login.css'

export default ({onReceive}) => {
  const handleFacebookLogin = async () => {
    let result = await Api.Googlelogin()
    if(result) {
      onReceive(result.user)
    } else {
      alert("Erro!")
    }
  }

  return (
    <>
    {/* <div className="login">
      <button onClick={handleFacebookLogin}>Logar com Facebook</button>
    </div> */}

    <div className='g-sign-in-button' onClick={handleFacebookLogin}>
      <div className='content-wrapper'>
          <div className='logo-wrapper'>
              <img src='https://developers.google.com/identity/images/g-logo.png' />
          </div>
          <span className='text-container'>
            <span>Sign in with Google</span>
          </span>
      </div>
    </div>
    </>
  )

}