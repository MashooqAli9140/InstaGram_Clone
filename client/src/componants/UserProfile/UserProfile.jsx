import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./UserProfile.css";
import axios from "axios";


const UserProfile = () => {
      const { username , myname } = useParams();
      const [ userDetails , setuserDetails ] = useState([]);


      //GETT USER DETAILS
useEffect(() => {
        async function GetSingleUser() {
          try {
            const response = await axios.get( `http://localhost:3500/single-user/${username}` , {

            } );

            console.log(
              "this is response from all posts-->",
              response.data
            );
            return response.status;
          } catch (error) {
            console.log("error while fetching single user details", error);
            return error;
          }
        }
        GetSingleUser();
      
 }, []);





// WHEN SOMEONE CLICK ON FOLLOW BTN THEN SEND FOLLOW REQ
 async function SendFollowrequest( e , username , myname ){
    e.preventDefault();
    console.log( username , myname )
    const data = {
          username,
          myname
    }
    try {
       const response = await axios.post(" http://localhost:3500/follow-req" , data ,  {

       })
       console.log( "response after follow-->" , response.data.finduser);
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
