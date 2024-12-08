import { BrowserRouter , Router , Routes , Route } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
import Homepage from './componants/HomePage/Homepage'
import LoginUser from './componants/HomePage/LoginUserPage/LoginUser'
import CommentSection from './componants/CommentSection/CommentSection'
import UserProfile from './componants/UserProfile/UserProfile'

function App() {

  return (
    <BrowserRouter>
    {/* <ToastContainer /> */}
          <Routes>
             <Route path="/" element={<Homepage />} />
             <Route path="/:loginUser" element={<LoginUser />} />
             <Route path="/:post_id/:username/:loginUser/:caption" element={<CommentSection />} />
             <Route path= "user-profile-page/:username/:myname" element={<UserProfile />} />

          </Routes>
   </BrowserRouter>
   )
}

export default App
