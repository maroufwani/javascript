import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home(){
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:5001/auth/verify', { withCredentials: true });
                navigate("/dashboard");
            } catch (err) {
                // Not authenticated, stay on home page
            }
        };
        checkAuth();
    }, [navigate]);
    return (
        <div className="container">
            <h3 className="text-center">Welcome to Expense App</h3>
        </div>
    )
}

export default Home;