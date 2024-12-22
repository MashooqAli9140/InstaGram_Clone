import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import playstorebtn from "/src/images/googleplaybtn.png";
import microsoftbtn from "/src/images/microsoftbtn.png";

const Homepage = () => {
  const [opensignform, setopensignupform] = useState("none");
  const [openloginform, setopenloginform] = useState("block");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginlink, setloginlink] = useState("none");
  const [signuplink, setsignuplink] = useState("flex");
  const [signupdone , setsignupdone] = useState(false);
  const [ loading , setLoading ] = useState(true);

  const navigate = useNavigate();

  //SENDING USER SIGNUP DATA
  async function Sendsignupdata(e) {
    e.preventDefault();
    const Signupdata = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(
        "https://instagram-clone-by-faiz.onrender.com/signup",
        Signupdata,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 201)
      setopensignupform("none"), setopenloginform("block");
      setusername("");
      setemail("");
      setpassword("");
      setsignupdone(true);
      setTimeout( () => setsignupdone(false) , 3000 );
      return response.status;
    } catch (error) {
      alert("duplicate detailes");
    }
  }

  //SENDING LOGIN REQ WITH EMAIL AND PASSWORD
  async function LoginRequest(e) {
    e.preventDefault();
    if(loading)
      {
        <div id="loading-screen">
         <h2> Login request sent...</h2>
         {/* Optional: Add a spinner or loading animation here */}
       </div>
      }
    if (!email || !password) alert("please fill all details");

    const Logindata = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "https://instagram-clone-by-faiz.onrender.com/login",
        Logindata,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // if( response.status === 201 ) setopensignupform("none") , setopenloginform("block");
      setemail("");
      setpassword("");
      const loginUser = response.data.userdetails.username;
      alert("login success");
      navigate(`/${loginUser}`);
      return response.status;
    } catch (error) {
      setemail("");
      setpassword("");
      alert("please check details or signup again");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div id="signuppageBG">
      <div id="signupOuterdiv">
        <div id="signupInnerdiv">
          {/* //created login form */}
          <div id="loginformdiv" style={{ display: `${openloginform}` }}>
            <div id="instahead">
              <h1>instagram</h1>
            </div>
            <div id="instahead" style={{  display: signupdone ? "flex" : "none" , justifyContent:"center", alignContent:'center', alignItems:"center" }}>
              <h2> Sign up done <i class="fa-solid fa-check fa-2x" style={{ color:"green"}}></i> </h2>
            </div>

            <form onSubmit={(e) => LoginRequest(e)}>
              <div id="emaildiv">
                <input
                  type="email"
                  placeholder="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  id="emailinput"
                />
              </div>

              <div id="passworddiv">
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  id="passwordinput"
                  minLength={8}
                />
              </div>

              <div id="logintbndiv">
                <button type="submit" id="loginbtn">
                  {" "}
                  Log in
                </button>
              </div>
            </form>

            <div
              style={{
                maxWidth: "100%",
                textAlign: "center",
                padding: "10px 10px 10px 10px",
              }}
            >
              <p style={{ color: "grey", fontSize: "12px", fontWeight: "500" }}>
                {" "}
                OR{" "}
              </p>
            </div>

            <div
              style={{
                maxWidth: "100%",
                textAlign: "center",
                padding: "30px 20px 30px 20px",
              }}
            >
              <a href="/"> forgot password ? </a>
            </div>
          </div>

          {/* //created signup form */}
          <div id="loginformdiv" style={{ display: `${opensignform}` }}>
            <div id="instahead">
              <h1>instagram</h1>
            </div>
            <div id="instahead2">
              <h3>Sign up to see photos and videos from your friends</h3>
            </div>

            <form onSubmit={(e) => Sendsignupdata(e)}>
              <div id="emaildiv">
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                  id="emailinput"
                />
              </div>

              <div id="emaildiv">
                <input
                  type="email"
                  placeholder="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  id="emailinput"
                />
              </div>

              <div id="passworddiv">
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  id="passwordinput"
                  minLength={8}
                />
              </div>

              <div id="logintbndiv">
                <button type="submit" id="signupbtn">
                  {" "}
                  Signup
                </button>
              </div>
            </form>
          </div>

          <div id="signupaccount" style={{ display: `${signuplink}` }}>
            <h5 style={{ fontWeight: "100" }}> don't have an account ?</h5>
            <button
              id="signformopenbtn"
              onClick={(e) => {
                setopensignupform("block"),
                  setopenloginform("none"),
                  setsignuplink("none"),
                  setloginlink("flex"),
                  setusername(""),
                  setemail(""),
                  setpassword("");
              }}
            >
              {" "}
              Sign up{" "}
            </button>
          </div>

          <div id="signupaccount" style={{ display: `${loginlink}` }}>
            <h5 style={{ fontWeight: "100" }}> Already have an account ?</h5>
            <button
              id="signformopenbtn"
              onClick={(e) => {
                setopensignupform("none"),
                  setopenloginform("block"),
                  setloginlink("none"),
                  setsignuplink("flex");
                  setusername(""),
                  setemail(""),
                  setpassword("");
              }}
            >
              {" "}
              Log in{" "}
            </button>
          </div>

          {/* 
//// */}
          <div
            style={{
              color: "white",
              maxWidth: "100%",
              textAlign: "center",
              padding: "20px 10px 20px 10px",
            }}
          >
            <h5 style={{ fontWeight: "100" }}> Get the app </h5>
          </div>
          <div id="applink">
            <div id="playstorebtn">
              <a href="/">
                {" "}
                <img id="playstorebtnimg" src={playstorebtn} alt="" />{" "}
              </a>
            </div>

            <div id="microsoftbtn">
              <a href="/">
                {" "}
                <img id="microsoftbtnimg" src={microsoftbtn} alt="" />{" "}
              </a>
            </div>
          </div>
          {/* 
//// */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
