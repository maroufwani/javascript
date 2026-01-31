import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:5001/auth/verify', { withCredentials: true });
                setAuthenticated(true);
            } catch (err) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
