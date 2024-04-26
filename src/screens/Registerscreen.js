import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    async function register() {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Password validation: at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        if (!name || !email || !password || !cpassword) {
            setError("All fields are required");
            return;
        }
    
        if (!emailRegex.test(email)) {
            let errorMessage = "Invalid email address. ";
            if (!email.includes("@")) {
                errorMessage += "Missing '@' symbol. ";
            }
            if (!email.includes(".")) {
                errorMessage += "Missing '.' symbol.";
            }
            setError(errorMessage);
            return;
        }
    
        if (!passwordRegex.test(password)) {
            setError("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        }
    
        if (password !== cpassword) {
            setError("Passwords do not match");
            return;
        }
    
        const user = {
            name,
            email,
            password,
            cpassword,
        };
    
        try {
            setLoading(true);
            const result = (await axios.post("/api/users/register", user)).data;
            setLoading(false);
            setSuccess(true);
            console.log(result);
            setName("");
            setEmail("");
            setPassword("");
            setCpassword("");
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Registration failed. Please try again later.");
        }
    }
    

    return(
        <div className="gifs">
            <div className="glass">
                
                {loading && (<Loader/>)}
                {error && (<Error message={error}/>)}
                {success && (<Success message="Registration Success"/>)}
                
                <center><h1 className="rl">Register</h1></center>
                <input type="text" placeholder="name" className="form" 
                value={name} onChange={(e)=>{setName(e.target.value)}} /> <br/>

                <input type="email" placeholder="email" className="form"
                value={email} onChange={(e)=>{setEmail(e.target.value)}}  /><br/>

                <input type="password" placeholder="password" className="form"
                value={password} onChange={(e)=>{setPassword(e.target.value)}}  /><br/>

                <input type="password" placeholder="confirm password" className="form"
                value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}  /><br/>

                <button className="rlb" onClick={register}>Register</button> 
                <br/> <br/>
                <a className="click-lo-ri" href="/login">Click here to login</a> 
            </div>
        </div>
    );
}

export default Registerscreen;
