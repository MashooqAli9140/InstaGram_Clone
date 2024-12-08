import React from 'react'
import { useParams } from 'react-router-dom';
import "./UserProfile.css"

const UserProfile = () => {
      const { username , myname } = useParams();




// WHEN SOMEONE CLICK ON FOLLOW BTN THEN SEND FOLLOW REQ
 async function SendFollowrequest( e , username , myname ){
    e.preventDefault();
    try {
       const response = await axios.post( `http://localhost:3500/follow-req/${username}/${myname}`, {
         headers: {
           "Content-type": "application/json",
         },
       })
       console.log( "response after follow-->" , response.data.finduser.followby);
       // setfollowby(response.data.finduser.followby);
       return response.status;
    } catch (error) {
     console.log("error while follow");
     return error.msge;
    }
} 

  return (
    <div id='user-profile-card'>
          <div id='user-profile-inner-card'>
             {/* //Navbar */}
             <div id='user-profile-nav'>
                   <div>  <h2> @{ username } </h2> </div>
                   <div>
                     <button
                      id="followbtn"
                      onClick={(e) => SendFollowrequest(e, username , myname )}
                      >
                      Follow
                    </button> 
                   </div>
             </div> {/* //Navbar */}


          </div>
    </div>
  )
}

export default UserProfile
