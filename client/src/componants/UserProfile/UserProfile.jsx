import React from 'react'
import { useParams } from 'react-router-dom';
import "./UserProfile.css"

const UserProfile = () => {
      
     const { username } = useParams();

  return (
    <div id='user-profile-card'>
          <div id='user-profile-inner card'>
             <div id='user-profile-nav'>
                   <h3> my name is {username} </h3>
             </div>
          </div>
    </div>
  )
}

export default UserProfile
