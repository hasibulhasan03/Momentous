import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./pages.css";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://momentous-backend.onrender.com/api/v1/auth/login", user, {
                withCredentials: true,
            });

            console.log("📥 Login API Response:", data);

            if (!data.user || !data.user.role) {
                throw new Error("Role is missing from the response!");
            }

            // Store in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);

            console.log(" Role stored in localStorage:", localStorage.getItem("role"));

            alert("Login Successful!");
            navigate("/dashboard");
        } catch (err) {
            console.error("❌ Login Error:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "Login failed!");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Login</button>
                </form>
                <p className="auth-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
