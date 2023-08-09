import "./signin.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserDashboard from "../UserDashboard/UserDashboard";
import OwnerDashboard from "../OwnerDashboard/OwnerDashboard";
import AdminDashboard from "../adminDashboard/AdminDashboard";
const base64 = require("base-64");

// import jwt_decode from "jwt-decode";

function SignIn({ UserInformation, socket }) {
  const [user, setUser] = useState(null);
  // const [userRoom, setUserRoom] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(null);
  const encodedUser = base64.encode(username + ":");
  const encodedPassweord = base64.encode(password);
  // console.log(`${encodedUser}${encodedPassweord}`);

  user && localStorage.removeItem("userToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}signin`,
        postData,
        {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            // 'Content-Type': 'application/json',
          },
        }
      );
      setUser(res.data);
      UserInformation(res.data);
      console.log(username);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // console.log({ userRoom })

  return (
    <div className='logincontainer'>
      {user ? (
        <div className='homme'>
          {user.user.role === "user" ? (
            <UserDashboard user={user} socket={socket} />
          ) : user.user.role === "admin" ? (
            <AdminDashboard user={user} socket={socket} />
          ) : (
            <OwnerDashboard user={user} socket={socket} />
          )}
        </div>
      ) : error ? (
        <div className='invalid'>
          invalid <b>username</b> or <b>password</b>.
        </div>
      ) : (
        <div className='loggin'>
          <form onSubmit={handleSubmit}>
            <span className='formTitle'>Log In</span>
            <input
            className='inputt'
              type='text'
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
            className='inputt'
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='submitButton'>
              Login
            </button>
            <p>
              If you dont have an account,please
              <Link to='/SignUp'> signup here</Link>
            </p>
          </form>
          {/* <button onClick={() => { setUser2(username) }}>abc</button> */}
        </div>
      )}
    </div>
  );
}

export default SignIn;
