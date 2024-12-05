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

         {/* // LIKE , COMMENT SECTION */}
          <div id='like-btn-div'>
                  <div id='like-cmnt-section'> 
                  <i class="fa-regular fa-heart fa-2x"></i>
                  <i class="fa-regular fa-comment fa-2x"></i>
                  <i class="fa-solid fa-share-nodes fa-2x"></i>
                  </div>

                  <div>
                     <p> save post </p>
                  </div>
          </div>

    </div>
  )
}

export default NewpostCard
