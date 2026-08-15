import { useState } from "react";

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

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            const response = await fetch ("http://localhost:8080/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Status: ", response.status);
            console.log("Response: ", data);
        } catch (error) {
            console.log("Login failed: ", error)
        }


    }

    return (
        <div>
            <h1> Login </h1>

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} />

                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />

                <button type="submit"> Login </button>
            </form>
        </div>
    )
}

export default Login;