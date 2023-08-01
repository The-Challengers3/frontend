import "./signup.css";
import axios from "axios";
import { useState } from "react";
// import jwt_decode from "jwt-decode";

function SignUp() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isOwner, setIsOwner] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = isOwner === 0 ? 'user' : 'owner';
            const res = await axios.post("http://localhost:3005/signup", {
                "username": username,
                "password": password,
                "role": role
            });
            setUser(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            {user ? (
                <div className="home">
                    <span>
                        Welcome to the <b>{user.user.role === 'owner' ? "owner" : user.user.role === 'admin' ? "admin" : 'user'}</b> dashboard{" "}
                        <b>{user.user.username}</b>.
                    </span>
                </div>
            ) : (
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <span className="formTitle">Sign Up</span>
                        <input
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="ownerr">
                            <label>owner</label>
                            <input
                                type="checkbox"
                                placeholder="password"
                                onChange={(e) => setIsOwner(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="submitButton">
                            Sign Up
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignUp;