import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { set } from "mongoose";

function Login() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:5001/auth/verify', { withCredentials: true });
                navigate("/dashboard");
            } catch (err) {
                // Not authenticated, stay on login page
            }
        };
        checkAuth();
    }, [navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors,setErrors]=useState({});
    const [message,setMessage]=useState("");
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const validate= ()=>{
        let newErr={};
        let isValid=true;
        if(formData.email.length===0){
            newErr.email="Email is required";
            isValid=false;
        }
        if(formData.password.length===0){
            newErr.password="Password is required";
            isValid=false;
        }
        setErrors(newErr);
        errors ? setMessage("") : null; 
        return isValid;
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            try{
                const body={
                    email: formData.email,
                    password: formData.password
                };
                const config={ withCredentials: true };
                const res = await axios.post('http://localhost:5001/auth/login',body,config);
                console.log(res);
                setMessage("Login successful");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } catch (err) {
                console.log(err.response.data.message);
                setErrors({
                    message: err.response.data.message || 'Something went wrong, please try again'
                })
            }
        } else {
            console.log("Validation failed", errors);
        }
    }
    return (
        <div className="container text-center">
            <h3>Login Page</h3>
            {message && (<div className="alert alert-success" role="alert">{message}</div>)}
            {errors.message && (<div className="alert alert-warning" role="alert">{errors.message}</div>)}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Email:</label>
                    <input className="form-control" type="email" name="email" onChange={handleChange} />
                    {errors.email && (<span className="text-danger">{errors.email}</span>)}
                </div>
                <div>
                    <label>Password:</label>
                    <input className="form-control" type="password" name="password" onChange={handleChange} />
                    {errors.password && (<span className="text-danger">{errors.password}</span>)}
                </div>
                <button className="btn btn-primary mt-3" type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;