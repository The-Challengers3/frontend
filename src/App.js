import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";
import SignUp from "./SignUp"
import SignIn from "./SignIn";
import Reels from './components/reels/reelsPage'

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3005"));
  }, []);

  useEffect(() => {
  
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
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
      )}
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      {/* <Reels/> */}
    </div>
  );
  };

export default App;
