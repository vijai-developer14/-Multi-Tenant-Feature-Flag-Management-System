import { useState } from 'react';
import {useNavigate} from "react-router-dom"
function Login() {
    
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginSubmit = async (e)=>{
        e.preventDefault()
        const url = "http://localhost:5000/api/superadminlogin";
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({username:userName, password:password})
        }
        const response = await fetch(url, options)
        if(!response.ok) 
            console.log("Incorrect username or password")
        
        if(response.ok) 
            navigate("/admin-panel", {replace: "true"});
        
            
        
    }

    return (
        <div>
            <h1 className="logTitle">Login</h1>
            <form action="" className="supAdminLoginBg" onSubmit={loginSubmit}>

                <input 
                type="text" 
                placeholder="User Name" 
                onChange={(e)=>setUserName(e.target.value)}
                required/>

                <input 
                type="password" 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)} 
                required/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
    }

export default Login
