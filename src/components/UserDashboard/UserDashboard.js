import "./dashboard.css";
import { Link } from "react-router-dom";
import avatar from "../../imgs/user (2).png";

function UserDashboard({ user, socket }) {
  localStorage.setItem("userToken", user.token);

  socket?.emit("newUser", user.user.username);

  const adminArray = ["laith", "ala", "nour", "savana", "amro"];

  const sendToAdmin = () => {
    socket?.emit("join_room", `${user?.user?.id}`);

    adminArray.map((name) => {
      socket?.emit("sendNotification", {
        senderName: user?.user?.username,
        receiverName: name,
        roomId: user?.user?.id,
      });
    });
  };

  const notifyBooking = () => {
    socket.emit("sendNotification", {
      senderName: user.user.username,
      receiverName: "salam",
    });
  };

  return (

    
    <div className="userr">

      <section className="userinfo">
        <img src={avatar}/>
      <b>{user.user.username}</b>
      </section>

      <span className="UdashTitle">
        Welcome to the user dashboard </span>

        <section className="bttns">
        <Link to='/Reels'>
          <button className="userBut">watch reels</button>
        </Link>
        <Link to='/map'>
          <button className="userBut">open map</button>
        </Link>
        <Link to='/Room'>
          <button className="userBut" onClick={sendToAdmin}>help center</button>
        </Link>
        <button  className="userBut"onClick={notifyBooking}>book here</button>
        </section>
       
    </div>
  );
}

export default UserDashboard;
