import React from 'react'
import "./NewpostCard.css"
import DP from "/src/images/dp.jpg";


const NewpostCard = () => {
  return (
    <div id='new-post-card-bg'>
         {/* // USERNAME SECTION  */}
      <div id='post-username-section'>
             <div id='post-profile'>
                   <img src= {DP} id='postprofile-img' alt="porfile pic" />
             </div>
             <div id='post-username-editbtn'>
                 <p> Username </p>  
                 <h2> --- </h2> 
             </div>
      </div>


         {/* // IMAGE SECTION */}
          <div id='post-img-div'>
                 <img src={DP} id='post-img' alt="post-img" />
          </div>

    </div>
  )
}

export default NewpostCard
