import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Reels from "./components/reels/reelsPage";
import Chat from "./components/chat/Chat";
import Room from "./components/chat/Room";
import { Route, Routes } from "react-router-dom";
// import Maps from "./components/map/Map";
import MApp from "./components/map/Map";
const App = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");

  const [socket, setSocket] = useState(null);
  // const [userRoom, setUserRoom] = useState("");

  function UserInformation(data) {
    setUser(data);
  }

  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_SERVER_URL}`));
  }, []);

  // useEffect(() => {

  //   socket?.emit("newUser", user);
  // }, [socket, user]);
  return (
    <div className="">
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
      {/* <SignUp /> */}
      {/* <SignIn /> */}

      <Routes>
        <Route
          path="/"
          element={<SignIn UserInformation={UserInformation} socket={socket} />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/map" element={<MApp user={user} />} />

        <Route path="/Reels" element={<Reels user={user} />} />
        <Route
          path="/Chat"
          element={
            <Chat
              socket={socket}
              username={user.user?.username}
              room={user?.user?.id}
            />
          }
        />
        <Route path="/Room" element={<Room socket={socket} user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
