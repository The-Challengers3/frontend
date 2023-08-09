import "./Room.css";
import { useState, useEffect } from "react";
import Chat from "./Chat";


function Room({ socket, user }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    socket?.emit("send_roomId", room);
    if (username !== "" && room !== "") {
      setShowChat(true);
    }
  };
  useEffect(() => {

    if (user.user?.role === 'user') {
      setShowChat(true)
    } else {
    }
  }, [showChat]);

  return (
    <div className="ChatApp">
      {
        user?.user?.role === 'user' ?
          (<Chat socket={socket} username={user.user.username} room={`${user.user.id}`} />) :
          !showChat
            ? (
              <div className="joinChatContainer">
                <h3>Join A Chat</h3>
                <input
                  type="text"
                  placeholder="Name..."
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
                <button onClick={joinRoom}>Join Room</button>
              </div>
            ) : (
              <Chat socket={socket} username={username} room={room} />
            )}
    </div>
  );
}

export default Room;