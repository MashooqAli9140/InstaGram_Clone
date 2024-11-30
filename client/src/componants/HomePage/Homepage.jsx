import React from 'react'

const Homepage = () => {


  return (
    <div>
      <h1> instagram</h1>
      <form type="submit"> 
        <input type="text" placeholder='username or email' />
        <input type="password" placeholder='password' />
        <button type='submit'> Log in</button>
      </form>
      <p> or </p>
     <a href="/"> forgot password ? </a>

     <p> don't have an account ?</p>
     <button> Sign up </button>
     <h5> Get the app </h5>
     <a href="/"> Get app on GPLAY </a>
     <br />
     <a href="/"> Get app on APP STORE </a>
    </div>
  )
}

export default Homepage
