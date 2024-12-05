import React from 'react'
import "./NewpostCard.css"
import DP from "/src/images/dp.jpg";


const NewpostCard = () => {
     const currentdate = new Date();
     const day = currentdate.getDate();
     const month = currentdate.toLocaleString( "Default" , { month: "long" });
     const year = currentdate.getFullYear();

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
                  <i class="fa-regular fa-heart fa-2x"> </i>
                  <i class="fa-regular fa-comment fa-2x"> </i>
                  <i class="fa-solid fa-share-nodes fa-2x"></i>
                  </div>

                  <div>
                     <p> save post </p>
                  </div>
          </div>

         {/* // caption section */}
           <div id='caption-section'>
              <p style={{ color:"white"}}> <b> username </b>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, cumque. Nobis et nesciunt quam, omnis commodi laboriosam similique adipisci impedit dolor quis ab quas consectetur voluptatum dolorum unde aut rem. </p>
           </div>

         {/* // time section section */}
           <div style={{ padding:"0px 10px 20px 10px" , color:"grey" , }}>
               <p> {`${day} ${month} ${year}`}</p>           
           </div>

    </div>
  )
}

export default NewpostCard
