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
    <div className="login">
      <button onClick={handleFacebookLogin}>Logar com Facebook</button>
    </div>
  )

}