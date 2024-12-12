import React, { useEffect, useState } from "react";
import "./NewpostCard.css";
import DP from "/src/images/dp.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

  const NewpostCard = () => {
  const { loginUser } = useParams();
  const [allPosts, setallPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state

  //make req for getting all the post data
  useEffect(() => {
    async function GetAllPost() {
      try {
        const response = await axios.get("https://instagram-clone-by-faiz.onrender.com/allpost", {});
        setallPosts(response.data.allPosts);
        console.log(
          "this is response from all posts-->",
          response.data.allPosts
        );
        return response.status;
      } catch (error) {
        return error;
      }
      finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
    GetAllPost();
  
  }, []);

  if (loading) {
    return (
      <div id="loading-screen">
        <h2>Loading...</h2>
        {/* Optional: Add a spinner or loading animation here */}
      </div>
    );
  }



  //CREATE FUNCTION FOR LIKE BTN WHEN SOMEONE CLICKS ON POST LIKE BTN
  async function LikebtnClicked(e, post_id, loginUser) {
    e.preventDefault();

    

    const PostLikedBY = {
      id: post_id,
      username: loginUser,
    };
    try {
      const response = await axios.post(
        "https://instagram-clone-by-faiz.onrender.com/post/likedby",
        PostLikedBY,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("post like success");
      return response.status;
    } catch (error) {
      console.log(error);
      alert("error while sending like the post req");
    }
  }

  //when someone clicks on comment btn then this function will run
  async function ShowCommentSection(e, post_id, username, loginUser, caption) {
    e.preventDefault();
    navigate(`/${post_id}/${username}/${loginUser}/${caption}`);
  }

  return (
    <>
      {allPosts.map((post) => (
        <div id="new-post-card-bg">
          {/* // USERNAME SECTION  */}
          <div id="post-username-section">
            <div id="post-profile">
              <img src= { DP } id="postprofile-img" alt="porfile pic" />
            </div>
            <div id="post-username-editbtn">
              <div style={{ flex:"1"}}>
              <p> <Link to= { `/user-profile-page/${post.username}/${loginUser}` } > {post.username} </Link>  </p>
              </div>
              <h2> --- </h2>
            </div>
          </div>

          {/* // IMAGE SECTION */}
          <div id="post-img-div">
            {/* //always put BE server port like BE server running on 3500 */}
            <img
              src={ post.image ? `https://instagram-clone-by-faiz.onrender.com${post.image}` : DP }
              id="post-img"
              alt="post-img"
            />
          </div>

          {/* // LIKE , COMMENT SECTION */}
          <div id="like-btn-div">
            <div id="like-cmnt-section">
              <button
                id="like-btn"
                onClick={(e) => LikebtnClicked(e, post._id, loginUser)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "white",
                }}
              >
                {" "}
                <i
                  class="fa-regular fa-heart fa-2x"
                  style={{ color: post.likedby.includes(loginUser) && "red" }}
                >
                  {" "}
                </i>{" "}
              </button>
              <button
                onClick={(e) =>
                  ShowCommentSection(
                    e,
                    post._id,
                    post.username,
                    loginUser,
                    post.newpostText
                  )
                }
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "white",
                }}
              >
                {" "}
                <i class="fa-regular fa-comment fa-2x"> </i>{" "}
              </button>
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "white",
                }}
              >
                {" "}
                <i class="fa-solid fa-share-nodes fa-2x"></i>{" "}
              </button>
            </div>

            <div>
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "white",
                }}
              >
                {" "}
                <i class="fa-regular fa-bookmark fa-2x"></i>{" "}
              </button>
            </div>
          </div>
          {/* // LIKE COUNT SECTION */}
          <div id="likecount">
            <p
              style={{
                display: post.likeCount === 0 && "none",
                color: "white",
                padding: "0px 10px 0px 10px",
              }}
            >
              {" "}
              {post.likeCount === 1
                ? `${post.likeCount} like`
                : `${post.likeCount} likes`}{" "}
            </p>
          </div>

          {/* // caption section */}
          <div id="caption-section">
            <p style={{ color: "white" }}>
              {" "}
              <b> {post.username} </b> {post.newpostText}{" "}
            </p>
          </div>

          {/* // time section section */}
          <div style={{ padding: "0px 10px 20px 10px", color: "grey" }}>
            <p> {`${post.day} ${post.month} ${post.year}`}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewpostCard;
