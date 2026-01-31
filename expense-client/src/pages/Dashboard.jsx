import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5001/auth/logout', {}, { withCredentials: true });
        } catch (err) {
            // Optionally handle error
        }
        navigate("/login");
    };

    return (
        <div className="container">
            <h3 className="text-center mt-4">Dashboard</h3>
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">Welcome User!</h5>
                    <p className="card-text">You are successfully logged in.</p>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
