import React from 'react'
import { useParams } from 'react-router-dom'
import "./LoginUser.css"
const LoginUser = () => {
      const {loginUser} = useParams();
  return (
    <div id='dashboardBG'>
           <div id='maindashboard'>
                 <h1> hello { loginUser }</h1>
           </div>
    </div>
  )
}

export default LoginUser
