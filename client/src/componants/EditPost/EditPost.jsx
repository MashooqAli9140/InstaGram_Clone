import React from 'react'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const EditPost = () => {
  const { posttext , id , loginUser } = useParams();
  const [newpostText, setnewpostText] = useState(posttext);
  const navigate = useNavigate();

  //SEND NEW POST FUNCTION FOR SENDING NEW POST DATA TO BE INLCUDING IMAGE
  async function SendEditPost(e) {
    e.preventDefault();
    const formdata = {
          id,
          newpostText
    }
    try {
      const response = await axios.put(
        "https://instagram-clone-by-faiz.onrender.com/edit-post",formdata,
        {
          headers: {},
        }
      );
      alert("post updated");
      setnewpostText("");
      navigate(`/${loginUser}`)
      return response.status;
    } catch (error) {
     console.log( error.message )
    }
  }


  return (
    <div style={{ padding:"20px 20px 20px 20px", maxWidth:"500px" , margin:" 0 auto 0"}} >
              <div
                id="new-post-card"
                style={{ height: "100vh" , border:"1px solid white" }}
              >
                <div id="new-post-nav">
                  <button
                    onClick={ () => navigate(`/${loginUser}`)}
                    style={{
                      cursor: "pointer",
                      background: "none",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    {" "}
                    <i
                      class="fa-solid fa-arrow-left fa-2x"
                      style={{ color: "white" }}
                    ></i>{" "}
                  </button>
                  <div>
                    <h2> Edit Post </h2>
                  </div>
                  <button
                    onClick={(e) => SendEditPost(e)}
                    style={{
                      cursor: "pointer",
                      fontWeight: "600",
                      background: "none",
                      outline: "none",
                      border: "none",
                      color: "#0095F6",
                    }}
                  >
                    {" "}
                    Update{" "}
                  </button>
                </div>
                <div id="newpost-textarea">
                  {/* <div id="storyprofile">
                    <img loading="lazy" id="storyprofile_img" src={ !userProfile ? img :  `https://instagram-clone-by-faiz.onrender.com${userProfile}` } alt="profile_img" />
                  </div> */}
                  <textarea 
                    style={{ borderBottom:"1px solid grey"}}
                    onChange={(e) => setnewpostText(e.target.value)}
                    value={newpostText}
                    name="new-post-text"
                    id="textarea"
                    placeholder="Type something..."
                  >
                    {" "}
                  </textarea>
                </div>
      
              </div>
    </div>
  )
}

export default EditPost
