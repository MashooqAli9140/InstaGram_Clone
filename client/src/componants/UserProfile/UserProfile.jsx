import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import axios from "axios";
import DP from "/src/images/dp.jpg";


const UserProfile = () => {
  const { username, myname } = useParams();
  const [userDetails, setuserDetails] = useState([]);
  const [followbtn, setfollowbtn] = useState(false);

  //GETT USER DETAILS
  useEffect(() => {
    async function GetSingleUser() {
      try {
        const response = await axios.get(
          `https://instagram-clone-by-faiz.onrender.com/single-user/${username}`);
        console.log(
          "this is response from single userdata-->",
          response.data.SingleUser.followby
        );
        setuserDetails(response.data.SingleUser.followby);
        return response.status;
      } catch (error) {
        console.log("error while fetching single user details", error);
        return error;
      }
    }
    GetSingleUser();
  }, [username]);


  // WHEN SOMEONE CLICK ON FOLLOW BTN THEN SEND FOLLOW REQ
  async function SendFollowrequest(e, username, myname) {
    e.preventDefault();
    console.log(username, myname);
    
    const data = {
      username,
      myname,
    };
    try {
      const response = await axios.post(
        "https://instagram-clone-by-faiz.onrender.com/follow-req",data,{

        }
      );
      console.log("response after follow-->", response.data.finduser);
      setfollowbtn( prev => !prev)
      return response.status;
    } catch (error) {
      console.log("error while follow");
      return error.msge;
    }
  }

  return (
    <div id="user-profile-card">
      <div id="user-profile-inner-card">
        {/* //Navbar */}
        <div id="user-profile-nav">
          <div>
            {" "}
            <h2> @{username} </h2>{" "}
          </div>
          <div>

            {/* // USER DETAILS ME NAME INCLUDE HONA CHAHIYE AND FOLLOW BTN AGR NI PRESSED HAI TO BHI FOLLOW HONA CHAHIYE */}
            {userDetails.includes(myname) && !followbtn ? (
              <button
                id="followbtn"
                onClick={(e) => SendFollowrequest(e, username, myname)}
              >
                unfollow
              </button>
            ) : (
              <button
                id="followbtn"
                onClick={(e) => SendFollowrequest(e, username, myname)}
              >
                follow
              </button>
            )}
          </div>
        </div>{" "}
        {/* //Navbar */}

    {/* //profile section */}
        <div id="prfile-section">
            <div id="profile-details">
              
            <div id="profile-left">
                <div id="profile-img-div">
                <img src= {`https://instagram-clone-by-faiz.onrender.com${UserProfile}`} id="profile-img"  alt="profile-pic" />
                </div>
            </div>

                <div id="profile-followers">
                    <div id="profile-name">
                        <p> { username } </p>
                    </div>
                    <div id="profile-followers-details">
                        <p> <b> 0 </b> posts  </p> 
                        <p> <b> { userDetails.length } </b> followers </p> 
                        <p> <b> 0 </b> following </p> 

                    </div>
                </div>
            </div>
        </div>
      {/* //profile section */}
      
       {/* //Bio section start*/}
    <div id="bio-section" style={{ padding:"10px 10px 10px 10px" , border:"1px solid rgba(255, 255, 255, 0.222)"}}>
         <p style={{ color:"white"}}>
         "Turning dreams into reality, one step at a time. 🚀💯"
         <br />
         "Building my empire. 👑💼 Success is the only option."
         <br />
         "Just a small-town kid with big-time goals. 🌟✈️"
         </p>
    </div>{/* //Bio section start*/}

      {/* //users post section start*/} 
      
      <div style={{ color:'white' , height:"50vh", border:"1px solid rgba(255, 255, 255, 0.222)" , overflow:"hidden", textAlign:"center", marginTop:"30px"}}>
           <h2> no post </h2>
      </div>
       
      </div>
    </div>
  );
};

export default UserProfile;
