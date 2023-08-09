import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import avatar1 from '../../imgs/user (5).png'
import avatar2 from '../../imgs/user (2).png'


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (


<section className="chat-section">
  <div className="chat-dec">
  <span className="dots">❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ </span>

  {/* <span className="dots">  = = = = = = = = = = = =</span> */}
    {/* <span className="dots">. . . . . . . . . . . . . . . . . .</span> */}
<h1> Welcome to our Help Center!</h1>
{/* <p>Welcome to our Help Center! </p> */}
{/* <p></p> */}
<p>Find answers to your questions, explore step-by-step guides, and get the support you need. Our comprehensive resources are here to make your experience smooth and enjoyable.</p>
{/* <span className="dots"> . . . . . . . . . . . . . . . . . .</span> */}

<span className="dots">❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ ❖ </span>

  </div>
  
   <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>

       
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    {username === messageContent.author ? <><img className="ava" src={avatar1}/> <p>{messageContent.message}</p></> : <> <p>{messageContent.message}</p><img className="ava" src={avatar2}/></> }

                  </div>
                  <div className="message-meta">
                  {username === messageContent.author ? <><p id="author">{messageContent.author}</p>    <p id="time">{messageContent.time}</p></> : <>    <p id="time">{messageContent.time}</p><p id="author">{messageContent.author}</p></> }

                    {/* <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>➽</button>
      </div>
      
    </div>
</section>

   
  );
}

export default Chat;