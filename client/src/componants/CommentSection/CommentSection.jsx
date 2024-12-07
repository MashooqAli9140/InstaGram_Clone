import React from 'react'
import "./CommentSection.css";
import { useNavigate, useParams } from "react-router-dom";


const CommentSection = () => {
    const navigate = useNavigate();
    const { post_id , username , loginUser } = useParams();



  return (
    <div id='comment-bg'>
     <div id='comment-dashboard'>
        
        <div id='comment-nav'>
            <button style={{ background:"none" , color:"white" , border:"none" , outline:"none" , cursor:"pointer" }} onClick={ () => navigate(`/${loginUser}`) }>
                 <div> <i class="fa-solid fa-arrow-left fa-2x"></i>  </div>
            </button>

             <h3 style={{ fontWeight:"500"}}> Comments </h3>
             <div> 
                <i style={{ color:"#121212", fontWeight:"100" }} class="fa-solid fa-arrow-left fa-2x"></i> 
            </div>
        </div>


     </div>

    </div>
  )
}

export default CommentSection
