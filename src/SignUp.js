import "./signup.css";
import axios from "axios";
import { useState } from "react";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard/OwnerDashboard";
// import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isOwner, setIsOwner] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = isOwner === 0 ? 'user' : 'owner';
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}signup`, {
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
      <div className="logincontainer">
        {user ? (
         
      navigate("/")
        
        ) : (
          <div className="login">
            <form onSubmit={handleSubmit}>
              <span className="formTitle">Sign Up</span>
              <input
              className="text"
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
              className="text"

                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="ownerr">
                <label>owner</label>
                <input
                className="ch"
                  type="checkbox"
                  checked={isOwner === 1}
                  onChange={(e) => setIsOwner(e.target.checked ? 1 : 0)}
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