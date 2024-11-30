import { useState } from "react";
import axios from "axios";

const BACKEND = "https://finance-tracker-project.onrender.com/auth/register";


function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(BACKEND, {
            name,
            email,
        });

        if (response.status === 201) {
            alert("registered");
            setName("");
            setEmail("");
        }
        } catch (error) {
            alert("error");
            console.error(error.message);
        }
    };

    return (
        <div className="login-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </label>
            <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </label>
            <button type="submit">Register</button>
            <p className="error-message"></p>
            <p className="success-message"></p>
        </form>
        </div>
  );
}

export default RegisterForm;
