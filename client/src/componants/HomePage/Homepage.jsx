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
    const Signupdata = { username, email, password };

    try {
      const response = await axios.post(
        "https://your-production-url/signup",
        Signupdata,
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
    }
  }

  // Function to handle user login request
  async function LoginRequest(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all details");
      return;
    }

    const Logindata = { email, password };

    try {
      const response = await axios.post(
        "https://your-production-url/login",
        Logindata,
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
    }
  }

  return (
    <div id="signuppageBG">
      <div id="signupOuterdiv">
        <div id="signupInnerdiv">
          {/* Login Form */}
          <div id="loginformdiv" style={{ display: openloginform }}>
            <div id="instahead">
              <h1>instagram</h1>
            </div>

            <form onSubmit={LoginRequest}>
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
                  Log in
                </button>
              </div>
            </form>

            <div style={{ maxWidth: "100%", textAlign: "center", padding: "10px" }}>
              <p style={{ color: "grey", fontSize: "12px", fontWeight: "500" }}>OR</p>
            </div>

            <div style={{ maxWidth: "100%", textAlign: "center", padding: "30px" }}>
              <a href="/">Forgot password?</a>
            </div>
          </div>

          {/* Signup Form */}
          <div id="loginformdiv" style={{ display: opensignform }}>
            <div id="instahead">
              <h1>instagram</h1>
            </div>

            <div id="instahead2">
              <h3>Sign up to see photos and videos from your friends</h3>
            </div>

            <form onSubmit={Sendsignupdata}>
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
                  Signup
                </button>
              </div>
            </form>
          </div>

          {/* Toggle Between Login and Signup Forms */}
          <div id="signupaccount" style={{ display: signuplink }}>
            <h5 style={{ fontWeight: "100" }}>Don't have an account?</h5>
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
            <h5 style={{ fontWeight: "100" }}>Already have an account?</h5>
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
          <div style={{ color: "white", maxWidth: "100%", textAlign: "center", padding: "20px" }}>
            <h5 style={{ fontWeight: "100" }}>Get the app</h5>
          </div>

          <div id="applink">
            <div id="playstorebtn">
              <a href="/">
                <img id="playstorebtnimg" src={playstorebtn} alt="Google Play" />
              </a>
            </div>

            <div id="microsoftbtn">
              <a href="/">
                <img id="microsoftbtnimg" src={microsoftbtn} alt="Microsoft Store" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
