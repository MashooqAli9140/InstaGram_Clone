import React from 'react'
import { useParams } from 'react-router-dom'
import "./LoginUser.css"
const LoginUser = () => {
      const {loginUser} = useParams();
  return (
    <div id='dashboardBG'>
           <div id='maindashboard'>
                 <div id='dashboard-Navbar'>
                      <div id='navlogo'>
                          <h1 style={{ fontFamily:"allura , cursive" , fontSize:"36px"}}>Instagram</h1>
                      </div>
                      <div id='nav-right'>
                            <button id='plusbtn'> <i class="fa-solid fa-plus fa-3x" style={{ color:"white"}}></i> </button>
                            <button id='heart'> <i class="fa-regular fa-heart fa-3x" style={{ color:"white"}}></i> </button>
                      </div>
                 </div>
           </div>
    </div>
  )
}

export default LoginUser
