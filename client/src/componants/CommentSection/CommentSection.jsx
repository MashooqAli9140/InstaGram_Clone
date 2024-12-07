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

        {/* //POST PROFILE AND CAOPTION SECTION */}
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



     </div>
    </div>
  )
}

export default CommentSection
