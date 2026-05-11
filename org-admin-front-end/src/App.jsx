import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes';
import AdminPanel from './Pages/AdminPanel'
import Home from "./Pages/Home"
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Home/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/admin-panel" element={<AdminPanel/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
