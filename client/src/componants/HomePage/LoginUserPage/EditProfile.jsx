import React, { useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./LoginUser.css";
import img from "/src/images/dp.jpg";
import NewpostCard from "../../NewpostCard/NewpostCard";
import axios from "axios";

const LoginUser = () => {
  const { loginUser } = useParams();
  const [pro_picture, set_pro_picture] = useState(null);
  const [ userProfile ,setuserprofile ] = useState("");
  const [ addprofilebtn , setaddprofilebtn ] = useState(true)
  const [ profilepicdone , setprofilepicdone ] = useState( false )

  //new post form details
  const [username, setusername] = useState(loginUser);
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
    set_pro_picture(e.target.files[0]);
    setaddprofilebtn( prev => !prev );
    console.log("Selected Image:", e.target.files[0]);
  }


  //SENDING PROFILE PICTURE
  async function Sendprofilepicture(e, loginUser) {
    e.preventDefault();
    const profileFormdata = new FormData();
    profileFormdata.append("username", loginUser);
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


        <div id="dashboard-bottom">

        </div>


      </div>
    </div>
  );
};

export default LoginUser;
