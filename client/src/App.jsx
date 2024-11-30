import { BrowserRouter , Router , Routes , Route } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
import Homepage from './componants/HomePage/Homepage'

function App() {

  return (
    <BrowserRouter>
    {/* <ToastContainer /> */}
          <Routes>
             <Route path="/" element={<Homepage />} />
             {/* <Route path="/signup" element={<Signup />} /> */}
          </Routes>
   </BrowserRouter>
   )
}

export default App
