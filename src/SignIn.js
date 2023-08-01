// import "./signin.css";
import axios from "axios";
import { useState } from "react";
const base64 = require('base-64');

// import jwt_decode from "jwt-decode";

function SignIn() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [rest, setRest] = useState(null);
    const [auth, setAuth] = useState(null);

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
            const res = await axios.post("http://localhost:3005/signin", postData, {
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                    // 'Content-Type': 'application/json',
                }
            });
            setUser(res.data);
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };
    const addRest = async () => {
        const postData = {
            name: 'jubran',
            img: 'image',
            price: '100$',
            ownerId: user.user.id
        }
        try {
            const res = await axios.post("http://localhost:3000/restaurants", postData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    // 'Content-Type': 'application/json',
                }
            });
            setRest(res.data);
        } catch (err) {
            console.log(err);
            setAuth(true);
        }
    }
    console.log(user)
    return (
        <div className="container">
            {user ? (
                <div className="home">
                    <span>
                        Welcome to the <b>{user.user.role === 'owner' ? "owner" : user.user.role === 'admin' ? "admin" : 'user'}</b> dashboard{" "}
                        <b>{user.user.username}</b>.
                    </span>
                    <button onClick={addRest}>add restaurant</button>
                    {rest ? (
                        <div>
                            <p>Restaurant: {rest.name}</p>
                            <p>image: {rest.img}</p>
                            <p>price: {rest.price}</p>
                        </div>
                    ) : auth ? 'you are not authorized' : ''}
                </div>
            ) : error ? (
                <div className="invalid">
                    invalid <b>username</b> or <b>password</b>.
                </div>
            )
                : (
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
                )
            }
        </div>
    );
}

export default SignIn;