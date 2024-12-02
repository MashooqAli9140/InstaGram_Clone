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
                          <h1>Instagram</h1>
                      </div>
                      <div id='nav-right'>
                            <button> <i class="fa-solid fa-plus"></i> </button>
                            <button> <i class="fa-regular fa-heart"></i> </button>
                      </div>
                 </div>
           </div>
    </div>
  )
}

export default LoginUser
