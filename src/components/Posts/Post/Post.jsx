import React from "react";
import { useGlobalPostContext } from "../../../hook/globalPostContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const demoImgUrl =
  "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1600";

const Post = ({ post }) => {
  const { dispatch } = useGlobalPostContext();
  const {
    _id,
    selectedImage,
    creator,
    title,
    message,
    tags,
    likes,
    createdAt,
  } = post;
  // dispatch update action
  const handleUpdate = () => {
    dispatch({ type: "SET_ID", payload: _id });
  };

  // dispatch delete action
  const handleRemove = async () => {
    const response = await fetch(`/posts/${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch({ type: "REMOVE_POST", payload: _id });
    }
  };

  // dispatch like post action
  const handleLike = async () => {
    const response = await fetch(`/posts/like/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }),
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_POST", payload: json });
    }
  };
  return (
    <div className="post">
      <div className="post-head">
        <img src={selectedImage || demoImgUrl} alt="" className="post-img" />
        <h3 className="creator">{creator}</h3>
      </div>
      <div className="post-desc">
        <p className="time">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
        <div className="tags">
          {tags && tags.map((tag, index) => <p key={index}>{`#${tag}`}</p>)}
        </div>
        <div className="post-text">
          <p className="title">{title}</p>
          <p className="message">{message}</p>
        </div>
      </div>
      <div className="btn-container">
        <div className="left-btn">
          <button className="btn like" onClick={handleLike}>
            Likes: {likes}
          </button>
        </div>
        <div className="right-btn">
          <button className="btn edit" onClick={handleUpdate}>
            Edit
          </button>
          <button className="btn delete" onClick={handleRemove}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
