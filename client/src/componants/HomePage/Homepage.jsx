import React, { useState } from "react";

const Homepage = () => {
      const [opensignform , setopensignupform ] = useState("none");
      const [openloginform , setopenloginform ] = useState("block");



  return (
    <div>
   //created login form
      <div id="loginformdiv" style={ { display: `${openloginform}` }} >
        <h1> instagram</h1>
        <form type="submit">
          <input type="text" placeholder="username or email" />
          <input type="password" placeholder="password" />
          <button type="submit"> Log in</button>
        </form>
        <p> or </p>
        <a href="/"> forgot password ? </a>

        <p> don't have an account ?</p>
        <button onClick={ (e) => { setopensignupform("block") , setopenloginform("none")   }} > Sign up </button>
        <h5> Get the app </h5>
        <a href="/"> Get app on GPLAY </a>
        <br />
        <a href="/"> Get app on APP STORE </a>
      </div>

   //created signup form
      <div id="loginformdiv" style={ { display: `${opensignform}` }} >
        <h1> register</h1>
        <form type="submit">
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="submit"> signup </button>
        </form>
        <p> already have an account ?</p>
        <button onClick={ (e) => { setopensignupform("none") , setopenloginform("block")   }} > Login </button>
      </div>

    </div>
  );
};

export default Homepage;
