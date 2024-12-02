import { BrowserRouter , Router , Routes , Route } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
import Homepage from './componants/HomePage/Homepage'
import LoginUser from './componants/HomePage/LoginUserPage/LoginUser'

function App() {

  return (
    <BrowserRouter>
    {/* <ToastContainer /> */}
          <Routes>
             <Route path="/" element={<Homepage />} />
             <Route path="/:loginUser" element={<LoginUser />} />
          </Routes>
   </BrowserRouter>
   )
}

export default App
