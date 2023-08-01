import "./signin.css";
import axios from "axios";
import { useState } from "react";
const base64 = require('base-64');

// import jwt_decode from "jwt-decode";

function SignIn() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const encodedUser = base64.encode(username + ':')
    const encodedPassweord = base64.encode(password)
    console.log(`${encodedUser}${encodedPassweord}`)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            username: username,
            password: password
        }
        try {
            const res = await axios.post("http://localhost:3000/signin", postData, {
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                    // 'Content-Type': 'application/json',
                }
            });
            setUser(res.data);
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
                        <span className="formTitle">Log In</span>
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
                        <button type="submit" className="submitButton">
                            Login
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignIn;