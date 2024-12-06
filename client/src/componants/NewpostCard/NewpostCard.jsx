import React, { useEffect, useState } from "react";
import "./NewpostCard.css";
import DP from "/src/images/dp.jpg";
import axios from "axios";
import { useParams } from 'react-router-dom'

const NewpostCard = () => {
  const { loginUser } = useParams();
  const currentdate = new Date();
  const day = currentdate.getDate();
  const month = currentdate.toLocaleString("Default", { month: "long" });
  const year = currentdate.getFullYear();
  const [allPosts, setallPosts] = useState([]);

  //make req for getting all the post data
  useEffect(() => {
    async function GetAllPost() {
      try {
        const response = await axios.get("http://localhost:3500/allpost", {});
        setallPosts(response.data.allPosts);
        console.log(
          "this is response from all posts-->",
          response.data.allPosts
        );
        return response.status;
      } catch (error) {
        console.log("error while fetching all the posts", error);
        return error;
      }
    }
    GetAllPost();
  }, []);



//CREATE FUNCTION FOR LIKE BTN WHEN SOMEONE CLICKS ON POST LIKE BTN
        async function LikebtnClicked( e , post_id , loginUser ){
              e.preventDefault();
              const PostLikedBY = {
                id: post_id,
                username: loginUser
              }
              try {
                  const response = await axios.post( "http://localhost:3500/post/likedby" , PostLikedBY , {
                    headers: {
                        "Content-type": "application/json",
                    }
                  }  )
                  console.log( response.data );
                  alert("post like success")
                  return response.status;
              } catch (error) {
                console.log(error);
                alert("error while sending like the post req")
              }
        }


  return (
    <>
      {allPosts.map((post) => (
        <div id="new-post-card-bg">

          {/* // USERNAME SECTION  */}
          <div id="post-username-section">
            <div id="post-profile">
              <img src={DP} id="postprofile-img" alt="porfile pic" />
            </div>
            <div id="post-username-editbtn">
              <p> { post.username } </p>
              <h2> --- </h2>
            </div>
          </div>

          {/* // IMAGE SECTION */}
          <div id="post-img-div">
          {/* //always put BE server port like BE server running on 3500 */}
            <img src={`http://localhost:3500${post.image}`} id="post-img" alt="post-img" /> 
          </div>

          {/* // LIKE , COMMENT SECTION */}
          <div id="like-btn-div">
            <div id="like-cmnt-section">

              <button id="like-btn" onClick={ (e) => LikebtnClicked( e , post._id , loginUser )} style={{ cursor:"pointer" , background:"none" , border:"none" , color:"white"}}> <i class="fa-regular fa-heart fa-2x"> </i> </button>
              <button style={{ cursor:"pointer" , background:"none" , border:"none" , color:"white"}}> <i class="fa-regular fa-comment fa-2x"> </i> </button>
              <button style={{ cursor:"pointer" , background:"none" , border:"none" , color:"white"}}> <i class="fa-solid fa-share-nodes fa-2x"></i> </button>
               
            </div>

            <div>
              <p> save post </p>
            </div>
          </div>

          {/* // caption section */}
          <div id="caption-section">
            <p style={{ color: "white" }}>
              {" "}
              <b> { post.username } </b> { post.newpostText }  </p>
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
