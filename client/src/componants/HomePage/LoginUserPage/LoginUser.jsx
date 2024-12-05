import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "./LoginUser.css";
import img from "/src/images/dp.jpg";
import NewpostCard from '../../NewpostCard/NewpostCard';
import axios from "axios";


const LoginUser = () => {
      const {loginUser} = useParams();
      const [ opedashboard , setopenDashboard ] = useState("block");
      const [ openNewpostCard , setopenNewpostCard ] = useState("none")

      //new post form details
      const[ username , setusername ] = useState(loginUser);
      const[ newpostText , setnewpostText ] = useState("");
      const [ selecetImage , setselectImage ] = useState();
      const currentdate = new Date();
      const day = currentdate.getDate();
      const month = currentdate.toLocaleString( "Default" , { month: "long" });
      const year = currentdate.getFullYear();


 /// creatting new form for new post details and send this form details to BE
      const formdata = new FormData();
      formdata.append( 'username' , username );
      formdata.append( 'newpostText',newpostText);
      formdata.append( 'day', day);
      formdata.append( 'month' , month );
      formdata.append( 'year' , year );
      if(selecetImage)
      {
            formdata.append('image' , selecetImage ) // image added to formdata
            console.log(" image now added in form");
      }

      //SEND NEW POST FUNCTION FOR SENDING NEW POST DATA TO BE INLCUDING IMAGE
      async function SendNewPost(e){
           e.preventDefault()
           try {
               const response = await axios.post( "http://localhost:3500/signup" , formdata , {
                     headers:{

                     },
               } )
               return response.status
           } catch (error) {
            console.log( "error while sending new post data", error )
           }
     }



      //handling post creation undo 
      function Postundo(){
            setopenDashboard("block");
            setopenNewpostCard("none");
      }

      //HANDLING NEW POST IMAGE SELECTION
      function handleImagechange(e){
            setselectImage( e.target.files[0] ); 
            setopenNewpostCard("block");
            setopenDashboard("none");
            console.log("Selected Image:", e.target.files[0]);
      }

      //SENDING NEW POST DETAILS TO BACKEND

  return (
    <div id='dashboardBG'>
           <div id='maindashboard'>


          {/* //OPEN NEW POST CARD FOR UPLOAD NEW POST */}
            <div id='new-post-card' style={{ height:"100vh" , display: `${ openNewpostCard }`}}>
            <div id='new-post-nav' >
                         <button style={{ cursor:"pointer" ,background:"none" , outline:"none" , border:"none"}} onClick={ () => Postundo() }> <i class="fa-solid fa-arrow-left fa-2x" style={{ color:"white" }}></i> </button>
                         <div>
                              <h2> New Post </h2>
                         </div>
                         <button onClick={ (e) => SendNewPost(e) } style={{ cursor:"pointer" , fontWeight:"600" ,background:"none" , outline:"none" , border:"none" , color:"#0095F6"}} > Share </button>
                </div>
                <div id='newpost-textarea'>
                        <div id='storyprofile'>
                             <img id='storyprofile_img' src={img} alt="profile_img" />
                        </div>
                        <textarea onChange={ (e) => setnewpostText(e.target.value)} name="new-post-text" id="textarea" placeholder='Type something...'> </textarea>
                </div>

                <div style={{ display: "flex" , justifyContent:"space-between" ,padding:"10px 10px 10px 10px" , background:"black" , color:"white" , fontWeight:"200", marginTop:"20px"}}>
                  <h4> Add location </h4> 
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div style={{ display: "flex" , justifyContent:"space-between" ,padding:"10px 10px 10px 10px" , background:"black" , color:"white" , fontWeight:"200", marginTop:"20px"}}>
                  <h4> Tag people </h4> 
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div style={{ display: "flex" , justifyContent:"space-between" ,padding:"10px 10px 10px 10px" , background:"black" , color:"white" , fontWeight:"200", marginTop:"20px"}}>
                  <h4> Advance setting </h4> 
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>


          {/* //OPEN DASHBOARD WHERE WE CAN SEE OTHERS POST */}
            <div style={{ display: `${opedashboard}`}}>
            <div id='dashboard-Navbar'>
                      <div id='navlogo'>
                          <h1 style={{ fontFamily:"allura , cursive" , fontSize:"36px"}}>Instagram</h1>
                      </div>
                      <div id='nav-right'>

                            <input type="file" accept='image/*' id='plusbtn' style={{ display:"none"}} onChange={ (e) =>  handleImagechange(e) } />
                            <label htmlFor="plusbtn" style={{ cursor:"pointer"}}>
                              <div id='plusbtn'>
                                  <i class="fa-solid fa-plus fa-2x" style={{ color:"white"}}></i> 
                              </div>
                            </label>
                            <button id='heart'> <i class="fa-regular fa-heart fa-2x" style={{ color:"white"}}></i> </button>

                      </div>
                 </div>
                 <div id='storydiv'>
                    <div id='storyprofilediv'>
                        <div id='storyprofile'>
                             <img id='storyprofile_img' src={img} alt="profile_img" />
                        </div>
                    </div>
                        <div id='yourstoryText'>
                              <h5 style={{ fontWeight:"100"}}> Your story </h5>
                        </div>
                 </div>
                 <NewpostCard />

            </div>

           </div>
    </div>
  )
}

export default LoginUser
