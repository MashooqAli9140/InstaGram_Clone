import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [opensignform, setopensignupform] = useState("none");
  const [openloginform, setopenloginform] = useState("block");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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
      const response = await axios.post("http://localhost:3500/signup", Signupdata, {
        headers: {
          "Content-type": "application/json",
        },
      });
      if( response.status === 201 ) setopensignupform("none") , setopenloginform("block");
      setusername("");
      setemail("");
      setpassword("");
      return response.status;

    } catch (error) {
      alert("duplicate detailes")
      console.log( error,"error while sending the signupdata")
    }
  }
  
//SENDING LOGIN REQ WITH EMAIL AND PASSWORD
async function LoginRequest(e) {
    e.preventDefault();
    if( !email || !password ) alert("please fill all details");

    const Logindata = {
      email,
      password,
    };
    try {
      const response = await axios.post("http://localhost:3500/login", Logindata, {
        headers: {
          "Content-type": "application/json",
        },
      });
      // if( response.status === 201 ) setopensignupform("none") , setopenloginform("block");
      setemail("");
      setpassword("");
      const loginUser = response.data.userdetails.username
      console.log( "login succes username is -->>" ,loginUser);
      // navigate(``)
      alert("login success");
      return response.status;

    } catch (error) {
      console.log( error,"error while Login")
    }
  }


  return (
    <div>
      {/* //created login form */}
      <div id="loginformdiv" style={{ display: `${openloginform}` }}>
        <h1> instagram</h1>
        <form onSubmit={ (e) => LoginRequest(e) }>
          <input type="email" placeholder="email" onChange={ (e) => setemail(e.target.value)} value={ email } />
          <input type="password" placeholder="password" onChange={ (e) => setpassword(e.target.value)} value={ password } />
          <button type="submit"> Log in</button>
        </form>
        <p> or </p>
        <a href="/"> forgot password ? </a>

        <p> don't have an account ?</p>
        <button onClick={(e) => { setopensignupform("block"), setopenloginform("none")}}
        >
          {" "}
          Sign up{" "}
        </button>
        <h5> Get the app </h5>
        <a href="/"> Get app on GPLAY </a>
        <br />
        <a href="/"> Get app on APP STORE </a>
      </div>

      {/* //created signup form */}
      <div id="loginformdiv" style={{ display: `${opensignform}` }}>
        <h1> register</h1>
        <form onSubmit ={(e) => Sendsignupdata(e)}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setusername(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
          <button type="submit" >
            {" "}
            signup{" "}
          </button>
        </form>
        <p> already have an account ?</p>
        <button
          onClick={(e) => {
            setopensignupform("none"), setopenloginform("block");
          }}
        >
          {" "}
          Login{" "}
        </button>
      </div>
    </div>
  );
};

export default Homepage;
