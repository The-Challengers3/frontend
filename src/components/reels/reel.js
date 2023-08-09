import React, { useRef, useState, useEffect } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import ReelModal from "./reelModal/modal";


import "./reel.css";

export default function Video({ url, user, reelId }) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentArr, setCommentArr] = useState([]);
  const [newComment, setNewComment] = useState("");

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
      const allComments = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}comments/${reelId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setCommentArr(allComments.data.comments);
      setShowComment(true);
      console.log(allComments.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewComment = async (e) => {
    e.preventDefault();
    console.log({ user });
    const newCom = {
      content: newComment,
      date: new Date(Date.now()).getHours() + new Date(Date.now()).getMinutes(),
      reelId: reelId,
    };
    console.log(typeof newCom.date);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}comments`,
        newCom,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setCommentArr((prev) => [...prev, res.data]);
      // window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
    setNewComment("");
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <div className='video-cards'>
      <video
        onClick={onVideoClick}
        className='video-player'
        ref={vidRef}
        src={url}
      />

      <section className="reel-btnns">
          <ReelModal className='commentBTN' user={user} />
      <CommentIcon
        style={{
          fontSize: 7 * 9,
          color: "white",
          cursor: "pointer",
        }}
        className='commentBTN'
        onClick={() => handleComment()}
      />
      </section>
        
      {showComment && (
        <div className='commentsContainer'>
          <section className="commentss">
          {commentArr?.map((comment) => {
            return <p className="commentt">{comment.content}</p>;
          })}  
          </section>
          
          <form>
            <input
            className="input-comment"
            value={newComment}
              placeholder='Type a new comment'
              onChange={(e) => setNewComment(e.target.value)}></input>
            <button type='submit' onClick={handleNewComment}>
            ➽
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
