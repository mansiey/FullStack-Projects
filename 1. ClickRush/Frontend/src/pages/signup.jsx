import { useState } from "react";
import { useNavigate } from 'react-router-dom';    //React Router hook that lets JavaScript navigate to another route
import './Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
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
                navigate("/login");
            }
        } catch (error) {
            console.log("Signup failed: ", error)
        }


    }

    return (
        <div className="signup-page">
            <h1> Signup </h1>

            <div className="signup-container">

                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="FirstName" value={formData.firstName} onChange={handleChange} />

                    <input type="text" name="lastName" placeholder="LastName" value={formData.lastName} onChange={handleChange} />

                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                    <button type="submit"> Signup </button>
                </form>

            </div>
        </div>
    )
}

export default Signup;