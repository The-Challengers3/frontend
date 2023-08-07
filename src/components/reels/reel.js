import React, { useRef, useState, useEffect } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios";


import "./reel.css";

export default function Video({ url, user, reelId }) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentArr, setCommentArr] = useState([]);
  const [newComment, setNewComment] = useState('');

  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };


  const handleComment = async () => {
    try {
      const allComments = await axios.get(`http://localhost:3005/comments/${reelId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          // 'Content-Type': 'application/json',
        },
      });
      setCommentArr(allComments.data);
      setShowComment(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewComment = async () => {
    const newCom = {
      content: newComment,
      date: new Date(Date.now()).getHours() +
        new Date(Date.now()).getMinutes(),
      userId: user.user.id,
      reelId: reelId
    }
    console.log(typeof newCom.date)
    try {
      const res = await axios.post("http://localhost:3005/comments", newCom, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          // 'Content-Type': 'application/json',
        },
      });
      setCommentArr([...commentArr, res.data]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleComment();
  }, []);

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <div className="video-cards">

      <video
        onClick={onVideoClick}
        className="video-player"
        ref={vidRef}
        src={url}
      // loop
      />
      <CommentIcon
        style={{
          fontSize: 7 * 9,
          color: "white",
          cursor: "pointer",
        }}
        className="commentBTN"
        onClick={() => handleComment}
      />
      {showComment && (<div className="commentsContainer">
        {
          // commentArr?.map((comment) => {
          //   return (
          //     <p>
          //       {comment}
          //     </p>
          //   )
          // })
        }
        <form>
          <textarea placeholder="Type a new comment" onChange={(e) => setNewComment(e.target.value)}>
          </textarea>
          <button type="submit" onClick={handleNewComment}>
            Add Comment
          </button>
        </form>
      </div>)
      }
    </div >
  );
}