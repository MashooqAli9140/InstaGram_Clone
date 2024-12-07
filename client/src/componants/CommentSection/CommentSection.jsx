import React from 'react'
import "./CommentSection.css";
import { useNavigate, useParams } from "react-router-dom";
import DP from "/src/images/dp.jpg";


const CommentSection = () => {
    const navigate = useNavigate();
    const { post_id , username , loginUser , caption } = useParams();



  return (
    <div id='comment-bg'>
     <div id='comment-dashboard'>
        
        {/* //COMMENT NAVABR */}
        <div id='comment-nav'>
            <button style={{ background:"none" , color:"white" , border:"none" , outline:"none" , cursor:"pointer" }} onClick={ () => navigate(`/${loginUser}`) }>
                 <div> <i class="fa-solid fa-arrow-left fa-2x"></i>  </div>
            </button>
             <h3 style={{ fontWeight:"500"}}> Comments </h3>
             <div> 
                <i style={{ color:"#121212", fontWeight:"100" }} class="fa-solid fa-arrow-left fa-2x"></i> 
            </div>
        </div>


        {/* //POST PROFILE AND CAPTION SECTION START*/}
        <div id='caption-bg'>
        <div style={{ display:"flex", alignContent:'center' ,alignItems:"center"}}>
            <div id="post-profile">
              <img src={DP} id="postprofile-img" alt="porfile pic" />
            </div>
            <div id="caption-section">
            <p style={{ color: "white" }}>
              {" "}
              <b> { username } </b> { caption }  </p>
            </div>
            </div>
        </div>       
        {/* //POST PROFILE AND CAPTION SECTION END */}

        {/* //ALL COMMENTS SECTIONS START */}
      <div>
        <div id='single-comment-bg'>
        <div style={{ display:"flex", alignContent:'center' ,alignItems:"center"}}>
            <div id="post-profile">
              <img src={DP} id="postprofile-img" alt="porfile pic" />
            </div>
            <div id="caption-section">
            <p style={{ color: "white" }}>
              {" "}
              <b> { username } </b> { caption }  </p>
            </div>
            </div>
        </div>
      </div> {/* //ALL COMMENTS SECTIONS END */}


        {/* //ADD NEW COMMENT FORM WITH BUITTON START */}
        <div id='comment-bottom'>
            <div style={{ display:"flex", alignContent:'center' ,alignItems:"center" , gap:"10px" , width:"100%"}}>
               <div id="post-profile">
                  <img src={DP} id="postprofile-img" alt="porfile pic" />
               </div>
                      <div id='send-comment-input'>
                              <input type="text" name="add new comment" id="add-newcmnt-input" placeholder='Add a comment...' />
                              <button style={{ background:"none" , border:"none" , outline:"none" , color:"#538DD7"}}>
                              <i class="fa-regular fa-paper-plane fa-2x"></i>
                              </button>
                      </div>
            </div>
        </div>




     </div>
    </div>
  )
}

export default CommentSection
