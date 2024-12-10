// Import necessary dependencies and assets
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import playstorebtn from "/src/images/googleplaybtn.png";
import microsoftbtn from "/src/images/microsoftbtn.png";

const Homepage = () => {
  // State for controlling forms and inputs
  const [opensignform, setopensignupform] = useState("none");
  const [openloginform, setopenloginform] = useState("block");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginlink, setloginlink] = useState("none");
  const [signuplink, setsignuplink] = useState("flex");

  const navigate = useNavigate();

  // Function to handle user signup request
  async function Sendsignupdata(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/signup",
        { username, email, password },
        { headers: { "Content-type": "application/json" } }
      );

      if (response.status === 201) {
        setopensignupform("none");
        setopenloginform("block");
      }

      setusername("");
      setemail("");
      setpassword("");
    } catch (error) {
      alert("Duplicate details");
      console.log("Error while sending the signup data:", error);
    }
  }

  // Function to handle user login request
  async function LoginRequest(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all details");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3500/login",
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );

      setemail("");
      setpassword("");

      const loginUser = response.data.userdetails.username;
      alert("Login success");
      navigate(`/${loginUser}`);
    } catch (error) {
      setemail("");
      setpassword("");
      alert("Please check details or sign up again");
      console.log("Error while logging in:", error);
    }
  }

  return (
    <div id="signuppageBG">
      <div id="signupOuterdiv">
        <div id="signupInnerdiv">
          {/* Login Form */}
          <div id="loginformdiv" style={{ display: openloginform }}>
            <h1 id="instahead">instagram</h1>

            <form onSubmit={LoginRequest}>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                id="emailinput"
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                id="passwordinput"
                minLength={8}
              />
              <button type="submit" id="loginbtn">Log in</button>
            </form>

            <p style={{ color: "grey", fontSize: "12px", fontWeight: "500" }}>OR</p>
            <a href="/">Forgot password?</a>
          </div>

          {/* Signup Form */}
          <div id="loginformdiv" style={{ display: opensignform }}>
            <h1 id="instahead">instagram</h1>
            <h3 id="instahead2">Sign up to see photos and videos from your friends</h3>

            <form onSubmit={Sendsignupdata}>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                id="emailinput"
              />
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                id="emailinput"
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                id="passwordinput"
                minLength={8}
              />
              <button type="submit" id="signupbtn">Signup</button>
            </form>
          </div>

          {/* Toggle Between Login and Signup Forms */}
          <div id="signupaccount" style={{ display: signuplink }}>
            <h5>Don't have an account?</h5>
            <button
              id="signformopenbtn"
              onClick={() => {
                setopensignupform("block");
                setopenloginform("none");
                setsignuplink("none");
                setloginlink("flex");
              }}
            >
              Sign up
            </button>
          </div>

          <div id="signupaccount" style={{ display: loginlink }}>
            <h5>Already have an account?</h5>
            <button
              id="signformopenbtn"
              onClick={() => {
                setopensignupform("none");
                setopenloginform("block");
                setloginlink("none");
                setsignuplink("flex");
              }}
            >
              Log in
            </button>
          </div>

          {/* App Download Links */}
          <h5 style={{ color: "white", textAlign: "center", padding: "20px" }}>Get the app</h5>
          <div id="applink">
            <a href="/">
              <img id="playstorebtnimg" src={playstorebtn} alt="Google Play" />
            </a>
            <a href="/">
              <img id="microsoftbtnimg" src={microsoftbtn} alt="Microsoft Store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
