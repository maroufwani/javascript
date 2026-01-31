import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:5001/auth/verify', { withCredentials: true });
                navigate("/dashboard");
            } catch (err) {
                // Not authenticated, stay on signup page
            }
        };
        checkAuth();
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const validate = () => {
        let newErr = {};
        let isValid = true;

        if (formData.name.length === 0) {
            newErr.name = "Name is required";
            isValid = false;
        }

        if (formData.email.length === 0) {
            newErr.email = "Email is required";
            isValid = false;
        }

        if (formData.password.length === 0) {
            newErr.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErr.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (formData.confirmPassword.length === 0) {
            newErr.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErr.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErr);
        errors ? setMessage("") : null;
        return isValid;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const body = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                };
                const config = { withCredentials: true };
                const res = await axios.post('http://localhost:5001/auth/register', body, config);
                console.log(res);
                setMessage("Signup successful! You can now login.");
            } catch (err) {
                console.log(err.response.data.message);
                setErrors({
                    message: err.response.data.message || 'Something went wrong, please try again'
                });
            }
        } else {
            console.log("Validation failed", errors);
        }
    }

    return (
        <div className="container text-center">
            <h3>Signup Page</h3>
            {message && (<div className="alert alert-success" role="alert">{message}</div>)}
            {errors.message && (<div className="alert alert-warning" role="alert">{errors.message}</div>)}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange} 
                    />
                    {errors.name && (<span className="text-danger">{errors.name}</span>)}
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange} 
                    />
                    {errors.email && (<span className="text-danger">{errors.email}</span>)}
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange} 
                    />
                    {errors.password && (<span className="text-danger">{errors.password}</span>)}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange} 
                    />
                    {errors.confirmPassword && (<span className="text-danger">{errors.confirmPassword}</span>)}
                </div>
                <button className="btn btn-primary mt-3" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
