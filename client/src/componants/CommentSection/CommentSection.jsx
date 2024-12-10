import React, { useEffect, useState } from "react";
import "./CommentSection.css";
import { useNavigate, useParams } from "react-router-dom";
import DP from "/src/images/dp.jpg";
import axios from "axios";

const CommentSection = () => {
  const navigate = useNavigate();
  const { post_id, username, loginUser, caption } = useParams();
  const [newComment, setnewComment] = useState("");
  const [allcomments, setAllComments] = useState([]);
  const [commentedBy, setCommentedBY] = useState([]);
  const [ cmntLike , setcmntlike ] = useState();
  const [ heartcolor , setheartcolor ] = useState(false);

  // SEND NEW COMMENT TO POST AND ADD IT TO DB
  async function SendNewComment(e, post_id, commentedBy, newComment) {
    e.preventDefault();
    const CommentData = {
      post_id,
      commentedBy,
      newComment,
    };

    try {
      const response = await axios.post(
        "http://localhost:3500/posts/new-comment",
        CommentData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("comment success ");
      setnewComment("");
      window.location.reload();
      return response.status;
    } catch (error) {
      console.log(error);
      alert("Failed");
      return error.msge;
    }
  }

  useEffect(() => {
    // FETCHING THE COMMENT BY POST ID
    async function FetchPostComments(id) {
      try {
        const response = await axios.get(
          `http://localhost:3500/posts/${id}`,
          {}
        );
        setAllComments(response.data.post.comment);
        setCommentedBY(response.data.post.commentedBy);
        return response.status;
      } catch (error) {
        console.log(error);
        return error.msge;
      }
    }
    FetchPostComments(post_id);
  }, []);


  //WHEN SOMEONE LIKES THE COMMENT
  function likecomment( e , index ){
    e.preventDefault();
    setcmntlike(index);
    setheartcolor( (prev) => !prev )
  }


  return (
    <div id="comment-bg">
      <div id="comment-dashboard">
        {/* //COMMENT NAVABR */}
        <div id="comment-nav">
          <button
            style={{
              background: "none",
              color: "white",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/${loginUser}`)}
          >
            <div>
              {" "}
              <i class="fa-solid fa-arrow-left fa-2x"></i>{" "}
            </div>
          </button>
          <h3 style={{ fontWeight: "500" }}> Comments </h3>
          <div>
            <i
              style={{ color: "#121212", fontWeight: "100" }}
              class="fa-solid fa-arrow-left fa-2x"
            ></i>
          </div>
        </div>

        
        {/* //POST PROFILE AND CAPTION SECTION START*/}
        <div id="caption-bg">
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <div id="post-profile">
              <img src={DP} id="postprofile-img" alt="porfile pic" />
            </div>
            <div id="caption-section">
              <p style={{ color: "white" }}>
                {" "}
                <b> {username} </b> {caption}{" "}
              </p>
            </div>
          </div>
        </div>
        {/* //POST PROFILE AND CAPTION SECTION END */}

          <div>
             { allcomments.length < 1 ? <h3 style={{ color: "white" , textAlign:"center"}}> No comments </h3> : ""}
          </div>

        {/* //ALL COMMENTS SECTIONS START */} 
        {allcomments.map((comment, index) => (
          <div key={index}>
            <div id="single-comment-bg">
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div id="post-profile">
                  <img src={DP} id="postprofile-img" alt="porfile pic" />
                </div>
                <div id="caption-section">
                  <p style={{ color: "white" }}>
                    {" "}
                    <b> {commentedBy[index]} </b> {comment}{" "}
                  </p>{" "}
                  {/* USING INDEX FOR GETTING CORRECT USERNAME FROM COMMENTEDBY ARRAY*/}           
                </div>
                <button style={{ background:"none", border:"none", outline:"none"}} onClick={ ( e ) => likecomment( e , index ) }>
                <i class="fa-regular fa-heart fa-1x" style={{ color: cmntLike === index && heartcolor ? " red " : "white"}}> </i> 
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* //ALL COMMENTS SECTIONS END */}

        {/* //ADD NEW COMMENT FORM WITH BUITTON START */}
        <div id="comment-bottom">
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <div id="post-profile">
              <img src={DP} id="postprofile-img" alt="porfile pic" />
            </div>
            <div id="send-comment-input">
              <input
                onChange={(e) => setnewComment(e.target.value)}
                type="text"
                name="add new comment"
                id="add-newcmnt-input"
                placeholder="Add a comment..."
                value={newComment}
              />
              <button
                onClick={(e) =>
                  SendNewComment(e, post_id, loginUser, newComment)
                }
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#538DD7",
                  cursor: "pointer",
                }}
              >
                <i class="fa-regular fa-paper-plane fa-2x"></i>
              </button>
            </div>
          </div>
        </div>{" "}
        {/* //ADD NEW COMMENT FORM WITH BUITTON END */}
      </div>
    </div>
  );
};

export default CommentSection;
