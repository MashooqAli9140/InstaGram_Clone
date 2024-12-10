import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./LoginUser.css";
import img from "/src/images/dp.jpg";
import NewpostCard from "../../NewpostCard/NewpostCard";
import axios from "axios";

const LoginUser = () => {
  const { loginUser } = useParams();
  const [opedashboard, setopenDashboard] = useState("block");
  const [openNewpostCard, setopenNewpostCard] = useState("none");
  const [pro_picture, set_pro_picture] = useState(null);
  const [userProfile, setuserprofile] = useState("");
  const [addprofilebtn, setaddprofilebtn] = useState(true);

  //new post form details
  const [username, setusername] = useState(loginUser);
  const [newpostText, setnewpostText] = useState("");
  const [selecetImage, setselectImage] = useState(null);
  const currentdate = new Date();
  const day = currentdate.getDate();
  const month = currentdate.toLocaleString("Default", { month: "long" });
  const year = currentdate.getFullYear();

  /// creatting new form for new post details and send this form details to BE
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("newpostText", newpostText);
  formdata.append("day", day);
  formdata.append("month", month);
  formdata.append("year", year);
  formdata.append("userProfile", userProfile);
  if (selecetImage) {
    formdata.append("image", selecetImage); // image added to formdata
  }

  //GETT USER DETAILS
  useEffect(() => {
    async function GetSingleUser() {
      try {
        const response = await axios.get(
          `http://localhost:3500/single-user/${username}`
        );
        setuserprofile(response.data.SingleUser.image);
        return response.status;
      } catch (error) {
        return error;
      }
    }
    GetSingleUser();
  }, [username]);

  //SEND NEW POST FUNCTION FOR SENDING NEW POST DATA TO BE INLCUDING IMAGE
  async function SendNewPost(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/new-post",
        formdata,
        {
          headers: {},
        }
      );
      alert("new post uploaded");
      setnewpostText("");
      window.location.reload();
      return response.status;
    } catch (error) {
      alert("error while sending new post please check console");
    }
  }

  //handling post creation undo
  function Postundo() {
    setopenDashboard("block");
    setopenNewpostCard("none");
  }

  //HANDLING NEW POST IMAGE SELECTION
  function handleImagechange(e) {
    setselectImage(e.target.files[0]);
    setopenNewpostCard("block");
    setopenDashboard("none");
  }

  //HANDLING PROFILE PICTURE SELECTION
  function handleProfilepicture(e) {
    set_pro_picture(e.target.files[0]);
    setaddprofilebtn((prev) => !prev);
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
      setprofilepicdone(false);
      return response.status;
    } catch (error) {
      alert("error while changing new pic");
    }
  }

  return (
    <div id="dashboardBG">
      <div id="maindashboard">
        {/* //OPEN NEW POST CARD FOR UPLOAD NEW POST */}
        <div
          id="new-post-card"
          style={{ height: "100vh", display: `${openNewpostCard}` }}
        >
          <div id="new-post-nav">
            <button
              style={{
                cursor: "pointer",
                background: "none",
                outline: "none",
                border: "none",
              }}
              onClick={() => Postundo()}
            >
              {" "}
              <i
                class="fa-solid fa-arrow-left fa-2x"
                style={{ color: "white" }}
              ></i>{" "}
            </button>
            <div>
              <h2> New Post </h2>
            </div>
            <button
              onClick={(e) => SendNewPost(e)}
              style={{
                cursor: "pointer",
                fontWeight: "600",
                background: "none",
                outline: "none",
                border: "none",
                color: "#0095F6",
              }}
            >
              {" "}
              Share{" "}
            </button>
          </div>
          <div id="newpost-textarea">
            <div id="storyprofile">
              <img id="storyprofile_img" src={img} alt="profile_img" />
            </div>
            <textarea
              onChange={(e) => setnewpostText(e.target.value)}
              value={newpostText}
              name="new-post-text"
              id="textarea"
              placeholder="Type something..."
            >
              {" "}
            </textarea>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 10px 10px 10px",
              background: "black",
              color: "white",
              fontWeight: "200",
              marginTop: "20px",
            }}
          >
            <h4> Add location </h4>
            <i class="fa-solid fa-arrow-right"></i>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 10px 10px 10px",
              background: "black",
              color: "white",
              fontWeight: "200",
              marginTop: "20px",
            }}
          >
            <h4> Tag people </h4>
            <i class="fa-solid fa-arrow-right"></i>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 10px 10px 10px",
              background: "black",
              color: "white",
              fontWeight: "200",
              marginTop: "20px",
            }}
          >
            <h4> Advance setting </h4>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        {/* //OPEN DASHBOARD WHERE WE CAN SEE OTHERS POST */}
        <div style={{ display: `${opedashboard}` }}>
          <div id="dashboard-Navbar">
            <div id="navlogo">
              <h1 style={{ fontFamily: "allura , cursive", fontSize: "36px" }}>
                Instagram
              </h1>
            </div>
            <div id="nav-right">
              <input
                type="file"
                accept="image/*"
                id="plusbtn"
                style={{ display: "none" }}
                onChange={(e) => handleImagechange(e, loginUser)}
              />
              <label htmlFor="plusbtn" style={{ cursor: "pointer" }}>
                <div id="plusbtn">
                  <i
                    class="fa-solid fa-plus fa-2x"
                    style={{ color: "white" }}
                  ></i>
                </div>
              </label>
              <button id="heart">
                {" "}
                <i
                  class="fa-regular fa-heart fa-2x"
                  style={{ color: "white" }}
                ></i>{" "}
              </button>
            </div>
          </div>
          <div id="storydiv">
            <div id="storyprofilediv">
              <div id="storyprofile">
                <img
                  id="storyprofile_img"
                  src={
                    userProfile ? `http://localhost:3500${userProfile}` : img
                  }
                  alt="profile_img"
                />
              </div>
            </div>
            <div id="yourstoryText">
              <h5 style={{ fontWeight: "100" }}> Your story </h5>
            </div>
          </div>

          {/* //ADD NEW PROFILE PICTURE START */}
          <div
            style={{
              display: pro_picture ? "flex" : "none",
              padding: "10px 10px 10px 10px",
              background: "grey",
              marginTop: "30px",
              justifyContent: "center",
            }}
          >
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
                <h3 style={{ color: "white" }}> Please add profile picture </h3>
                <i class="fa-solid fa-plus fa-2x" style={{ color: "white" }}>
                  {" "}
                </i>
                <button
                  style={{
                    cursor: addprofilebtn ? "not-allowed" : "pointer",
                    borderRadius: "10px",
                    fontWeight: "700",
                    background: addprofilebtn ? "black" : "#0095F6",
                    padding: "10px 10px 10px 10px",
                    color: "white",
                    border: "none",
                    outline: "none",
                  }}
                  disabled={addprofilebtn}
                  onClick={(e) => Sendprofilepicture(e, loginUser)}
                >
                  {" "}
                  Add Picture{" "}
                </button>
              </div>
            </label>
          </div>
          {/* //ADD NEW PROFILE PICTURE END */}
          <NewpostCard />
          <br />
          <div style={{ marginBottom: "60px" }}>
            <br />
            <br />
          </div>
        </div>

        <div id="dashboard-bottom">
          <a href="/">
            {" "}
            <i class="fa-solid fa-house fa-2x"></i>{" "}
          </a>
          <a href="/">
            {" "}
            <i class="fa-solid fa-magnifying-glass fa-2x"></i>{" "}
          </a>
          <a href="/">
            {" "}
            <i class="fa-solid fa-play fa-2x"></i>{" "}
          </a>
          <a href="/">
            {" "}
            <i class="fa-brands fa-facebook-messenger fa-2x"></i>{" "}
          </a>
          <Link to={`/edit-profile/${loginUser}`}>
            <div style={{ border: "2px solid white" }} id="storyprofile">
              <img
                id="storyprofile_img"
                src={userProfile ? `http://localhost:3500${userProfile}` : img}
                alt="profile_img"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
