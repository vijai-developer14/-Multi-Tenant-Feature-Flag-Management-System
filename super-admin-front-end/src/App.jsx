import './App.css'
import ProtectedRoutes from './utils/ProtectedRoutes';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/admin-panel" element={<AdminPanel/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
