import React from 'react'

const EditPost = () => {
  const [newpostText, setnewpostText] = useState("");


  //SEND NEW POST FUNCTION FOR SENDING NEW POST DATA TO BE INLCUDING IMAGE
  async function SendNewPost(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://instagram-clone-by-faiz.onrender.com/new-post",
        formdata,
        {
          headers: {},
        }
      );
      alert("new post uploaded");
      setnewpostText("");
      window.location.reload();
      return response.status;
    } catch (error) {
      alert("error while sending new post please check console");
    }
  }

  
  return (
    <div>
              <div
                id="new-post-card"
                style={{ height: "100vh"}}
              >
                <div id="new-post-nav">
                  <button
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
                    <h2> New Post </h2>
                  </div>
                  <button
                    onClick={(e) => SendNewPost(e)}
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
                    Share{" "}
                  </button>
                </div>
                <div id="newpost-textarea">
                  {/* <div id="storyprofile">
                    <img loading="lazy" id="storyprofile_img" src={ !userProfile ? img :  `https://instagram-clone-by-faiz.onrender.com${userProfile}` } alt="profile_img" />
                  </div> */}
                  <textarea
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
