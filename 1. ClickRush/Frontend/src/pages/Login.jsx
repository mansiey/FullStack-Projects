import { useState } from "react";
import { useNavigate } from 'react-router-dom';    //React Router hook that lets JavaScript navigate to another route
import { useAuth } from "../context/authContext";
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Status: ", response.status);
            console.log("Response: ", data);

            if (response.ok) {
                const token = data.data.token;
                login(token);

                navigate("/games");
            }
        } catch (error) {
            console.log("Login failed: ", error)
        }


    }

    return (
        <div className="login-page">
            <h1> Login </h1>

            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                    <button type="submit"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
