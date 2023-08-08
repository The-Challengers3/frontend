import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Reels from "./components/reels/reelsPage";
import Chat from "./components/chat/Chat";
import Room from "./components/chat/Room";
import { Route, Routes } from "react-router-dom";
import MApp from "./components/map/Map";
const App = () => {
  const [user, setUser] = useState("");

  const [socket, setSocket] = useState(null);

  function UserInformation(data) {
    setUser(data);
  }

  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_SERVER_URL}`));
  }, []);

  return (
    <div className=''>
      <Routes>
        <Route
          path='/'
          element={<SignIn UserInformation={UserInformation} socket={socket} />}
        />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/map' element={<MApp user={user} />} />
        <Route path='/Reels' element={<Reels user={user} />} />
        <Route
          path='/Chat'
          element={
            <Chat
              socket={socket}
              username={user.user?.username}
              room={user?.user?.id}
            />
          }
        />
        <Route path='/Room' element={<Room socket={socket} user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
