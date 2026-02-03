import { useState } from "react";
import axios from "axios";

function Reset() {
    const [formData, setFormData] = useState({
        email: ""
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
        setErrors(newErr);
        errors ? setMessage("") : null; 
        return isValid;
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            try{
                const body={
                    email: formData.email
                };
                const config={ withCredentials: true };
                const res = await axios.post('http://localhost:5001/auth/reset-password',body,config);
                console.log(res);   
                setMessage("Password reset link sent to your email");
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
        <>
                    <form onSubmit={handleFormSubmit}>
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
                <button className="btn btn-primary mt-3" type="submit">Reset Password</button>
            </form>
        </>
    )
}

export default Reset;