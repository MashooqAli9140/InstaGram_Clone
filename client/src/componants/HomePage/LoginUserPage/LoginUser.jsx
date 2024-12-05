import React from 'react'
import { useParams } from 'react-router-dom'
import "./LoginUser.css";
import img from "/src/images/dp.jpg";
import NewpostCard from '../../NewpostCard/NewpostCard';

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
                            <button id='plusbtn'> <i class="fa-solid fa-plus fa-2x" style={{ color:"white"}}></i> </button>
                            <button id='heart'> <i class="fa-regular fa-heart fa-2x" style={{ color:"white"}}></i> </button>
                      </div>
                 </div>
                 <div id='storydiv'>
                    <div id='storyprofilediv'>
                        <div id='storyprofile'>
                             <img id='storyprofile_img' src={img} alt="profile_img" />
                        </div>
                    </div>
                        <div id='yourstoryText'>
                              <h5 style={{ fontWeight:"100"}}> Your story </h5>
                        </div>
                 </div>
                 <NewpostCard />
           </div>
    </div>
  )
}

export default LoginUser
