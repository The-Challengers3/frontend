import { useEffect, useState } from "react";
// import "./App.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";
import SignUp from "./SignUp"
import SignIn from "./SignIn";
import Reels from './components/reels/reelsPage'
import Room from "./components/chat/Room";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  function UserInformation (data){
    setUser(data)
  }

  useEffect(() => {
    setSocket(io("http://localhost:3005"));
  }, []);

  useEffect(() => {
  
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {/* {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <h2>Lama App</h2>

          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )} */}
      <Routes>
        <Route
          path="/"
          element={<SignIn UserInformation={UserInformation} />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Reels" element={<Reels user={user} />} />
        <Route path="/Room" element={<Room socket={socket} user={user} />} />
      </Routes>
    </div>
  );
  };

export default App;
