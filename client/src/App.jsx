import { BrowserRouter , Router , Routes , Route } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
import Homepage from './componants/HomePage/Homepage'
import LoginUser from './componants/HomePage/LoginUserPage/LoginUser'
import CommentSection from './componants/CommentSection/CommentSection'

function App() {

  return (
    <BrowserRouter>
    {/* <ToastContainer /> */}
          <Routes>
             <Route path="/" element={<Homepage />} />
             <Route path="/:loginUser" element={<LoginUser />} />
             <Route path="/:post_id/:username/:loginUser" element={<CommentSection />} />
          </Routes>
   </BrowserRouter>
   )
}

export default App
