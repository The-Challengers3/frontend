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

    const handleDelete = async (id) => {
        setSuccess(false);
        setError(false);
        try {
            await axiosJWT.delete("/users/" + id, {
                headers: { authorization: "Bearer " + user.accessToken },
            });
            setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };
    // const refreshToken = async () => {
    //     try {
    //         const res = await axios.post("/refresh", { token: user.refreshToken });
    //         setUser({
    //             ...user,
    //             accessToken: res.data.accessToken,
    //             refreshToken: res.data.refreshToken,
    //         });
    //         return res.data;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const axiosJWT = axios.create()

    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         let currentDate = new Date();
    //         const decodedToken = jwt_decode(user.accessToken);
    //         if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //             const data = await refreshToken();
    //             config.headers["authorization"] = "Bearer " + data.accessToken;
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );


    return (
        <div className="container">
            {user ? (
                <div className="home">
                    <span>
                        Welcome to the <b>{user.role === 'owner' ? "owner" : "user"}</b> dashboard{" "}
                        <b>{user.username}</b>.
                    </span>
                    <span>Delete Users:</span>
                    <button className="deleteButton" onClick={() => handleDelete(1)}>
                        Delete John
                    </button>
                    <button className="deleteButton" onClick={() => handleDelete(2)}>
                        Delete Jane
                    </button>
                    {error && (
                        <span className="error">
                            You are not allowed to delete this user!
                        </span>
                    )}
                    {success && (
                        <span className="success">
                            User has been deleted successfully...
                        </span>
                    )}
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
                        <input
                            type="checkbox"
                            placeholder="password"
                            onChange={(e) => setIsOwner(e.target.value)}
                        />
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