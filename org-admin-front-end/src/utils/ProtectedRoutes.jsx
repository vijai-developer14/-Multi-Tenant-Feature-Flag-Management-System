import { useState, useEffect } from "react";
import {Outlet, Navigate} from "react-router-dom";

function ProtectedRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
useEffect(() => {
    const checkAuth = async () => {
        try {
            const result = await fetch("http://localhost:5000/user/verifyOrg", {
                method: "GET",
                credentials: "include"
            })
            if (result.ok) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            setIsAuthenticated(false)
        }
    }
        checkAuth()
    }, [])

    if (isAuthenticated === null) return <div>Loading...</div>
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoutes
