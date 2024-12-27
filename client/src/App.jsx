import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Homepage from "./componants/HomePage/Homepage";
import LoginUser from "./componants/HomePage/LoginUserPage/LoginUser";
import CommentSection from "./componants/CommentSection/CommentSection";
import UserProfile from "./componants/UserProfile/UserProfile";
import EditProfile from "./componants/HomePage/LoginUserPage/EditProfile.jsx";
import EditPost from "./componants/EditPost/EditPost.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:loginUser" element={<LoginUser />} />
        <Route
          path="/:post_id/:username/:loginUser/:caption"
          element={<CommentSection />}
        />
        <Route
          path="user-profile-page/:username/:myname"
          element={<UserProfile />}
        />
        <Route path="edit-profile/:username" element={<EditProfile />} />        
        <Route path="edit-post/:posttext/:id/:loginUser" element={<EditPost />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
