import { useState } from "react";
import axios from "axios";

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
        const response = await axios.post("http://localhost:5001/auth/register", {
            name,
            email,
        });

        if (response.status === 201) {
            alert("registered");
            setSuccessMessage("Registration successful! You can now log in.");
            setName("");
            setEmail("");
        }
        } catch (error) {
            alert("error");
            console.error(error.message);
            setErrorMessage(error.message);
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
