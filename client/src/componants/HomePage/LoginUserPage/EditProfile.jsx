import React, { useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./LoginUser.css";
import img from "/src/images/dp.jpg";
import NewpostCard from "../../NewpostCard/NewpostCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const { username } = useParams();
  const [pro_picture, set_pro_picture] = useState(null);
  const [ userProfile ,setuserprofile ] = useState("");
  const [ addprofilebtn , setaddprofilebtn ] = useState(true)
  const [ profilepicdone , setprofilepicdone ] = useState( false )
  const navigate = useNavigate();

  //new post form details
  const [newpostText, setnewpostText] = useState("");
  const [selecetImage, setselectImage] = useState(null);
  const currentdate = new Date();

  //GETT USER DETAILS
    useEffect(() => {
      async function GetSingleUser() {

        try {
          const response = await axios.get(
            `http://localhost:3500/single-user/${username}`);
          console.log(
            "this is response from single userdata-->",
            response.data
          );
          setuserprofile( response.data.SingleUser.image );
          return response.status;
        } catch (error) {
          console.log("error while fetching single user details", error);
          return error;
        }
      }
      GetSingleUser();
    }, [username]);


  //HANDLING PROFILE PICTURE SELECTION
  function handleProfilepicture(e) {
    e.preventDefault();
    set_pro_picture(e.target.files[0]);
    alert("image selected")
    console.log("Selected Image success:", e.target.files[0]);
  }


  //SENDING PROFILE PICTURE
  async function Sendprofilepicture( e, username ) {
    e.preventDefault();
    if(!pro_picture) return alert("please select Profile picture")
    
    const profileFormdata = new FormData();
    profileFormdata.append("username", username);
    if (pro_picture) {
      profileFormdata.append("image", pro_picture);
    } else {
      alert("please select image");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3500/add-profile-picture",
        profileFormdata,
        {
          headers: {},
        }
      );
      alert("image updated success");
      window.location.reload();
      setprofilepicdone(true);
      return response.status;
    } catch (error) {
      console.log("error while changing profile picture", error);
      alert("error while changing new pic");
    }
  }

  return (
    <div id="dashboardBG">
      <div id="maindashboard">

            {/* //EDIT NAVABR START*/}
            <div id="comment-nav">
          <button
            style={{
              background: "none",
              color: "white",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/${username}`)}
          >
            <div>
              {" "}
              <i class="fa-solid fa-arrow-left fa-2x"></i>{" "}
            </div>
          </button>
          <h3 style={{ fontWeight: "500" }}> Edit Profile </h3>
          <div>
            <i
              style={{ color: "#121212", fontWeight: "100" }}
              class="fa-solid fa-arrow-left fa-2x"
            ></i>
          </div>
        </div>
            {/* //EDIT NAVABR END*/}


        <div style={{ padding:"10px 10px 10px 10px"}}>    
            <div style={{ display:"flex", borderRadius:"20px", gap:"20px" , backgroundColor:"grey" , padding:"10px 10px 10px 10px "}}>

            <div>
             <div id="storyprofile">
                <img id="storyprofile_img" src= { userProfile ? `http://localhost:3500${userProfile}` : img } alt="profile_img" />
              </div>
            </div>

            <div style={{ flex:"1", display:"flex", justifyContent:"space-between", alignItems:"center", gap:'10px', padding:"10px 10px 10px 10px"}}>
                 <h3 style={{color:"white"}}> { username    }  </h3>
            <input
              type="file"
              accept="image/*"
              id="plusbtn_1"
              style={{ display: "none" }}
              onChange={(e) => handleProfilepicture(e)}
            />
            <label htmlFor="plusbtn_1" style={{ cursor: "pointer" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
              <i class="fa-solid fa-plus fa-2x" style={{ color: "white" }}>
                  {" "}
              </i>
              <button onClick={ (e) => Sendprofilepicture(e , username)} style={{ cursor:"pointer" , background:"#178CF6", color:"white", fontWeight:"600" ,padding:"10px 10px 10px 10px " , borderRadius:"20px" , border:"none" ,outline:"none"}}> Change profile </button>
              </div>
            </label>

            </div>
            </div>
        </div>
 


      </div>
    </div>
  );
};

export default LoginUser;
