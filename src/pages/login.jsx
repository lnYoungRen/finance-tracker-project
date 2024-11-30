import { useState } from "react";
import axios from "axios";

const BACKEND = "https://finance-tracker-project.onrender.com";

function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND}/auth/login`, {
        name,
        email,
      });

      if (response.status === 200) {
        alert("Login successful");
        localStorage.setItem("userId", response.data.user._id);
        console.log(response.data.user);
        window.location.href = "/";
      }
      alert("Login failed")
    } catch (error) {
      console.error(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </form>
    </div>
  );
}

export default LoginForm;
