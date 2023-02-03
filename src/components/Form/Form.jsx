import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useGlobalPostContext } from "../../hook/globalPostContext";
import { useGlobalUserContext } from "../../hook/globalUserContext";

const Form = () => {
  const { dispatch, currentId, posts } = useGlobalPostContext();
  const { dispatch: userDispatch, user, errorText } = useGlobalUserContext();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    tags: "",
    message: "",
    selectedImage: "",
  });

  // find single post
  let post;
  if (currentId) {
    post = posts.find((post) => post._id === currentId);
  } else {
    post = null;
  }

  // create or update post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      userDispatch({ type: "LOGGED_OUT", payload: "Please Signup First!" });
      dispatch({ type: "REMOVE_ID" });
      clear();
    }

    setTimeout(() => {
      userDispatch({ type: "REMOVE_TEXT" });
    }, 3000);
    const { title, message, tags, selectedImage } = postData;
    const imageFile = selectedImage.base64;
    const tagsArray = tags.split(",");
    const fullname = `${user.user.firstname} ${user.user.lastname}`;

    const response = await fetch(currentId ? `/posts/${currentId}` : "/posts", {
      method: currentId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        creator: fullname,
        title,
        message,
        tags: tagsArray,
        selectedImage: imageFile,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: currentId ? "UPDATE_POST" : "CREATE_POST",
        payload: json,
      });
      clear();
    }
  };

  // fetch update data
  useEffect(() => {
    if (post) {
      const { creator, title, message, tags, selectedImage } = post;
      setPostData({
        creator,
        title,
        message,
        tags: tags.toString(),
        selectedImage: { base64: selectedImage },
      });
    }
  }, [post]);

  // clear inputs
  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      tags: "",
      message: "",
      selectedImage: "",
    });
  };

  return (
    <form className="create-form" autoComplete="off" onSubmit={handleSubmit}>
      <h3 className="form-title">
        {currentId ? "Update" : "Create"} Your Fun Moment{" "}
      </h3>
      {/* title */}
      <div className="form-group">
        <label htmlFor="title">Title: </label>
        <input
          required
          type="text"
          id="title"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
      </div>
      {/* message */}
      <div className="form-group">
        <label htmlFor="message">Message: </label>
        <input
          required
          type="text"
          id="message"
          placeholder="Message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
      </div>
      {/* tags */}
      <div className="form-group">
        <label htmlFor="tags">Tags: </label>
        <input
          required
          type="text"
          id="tags"
          placeholder="Tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
      </div>
      {/* image file */}
      <div className="from-group">
        <FileBase
          type="file"
          multiple={false}
          onDone={(base64) =>
            setPostData({ ...postData, selectedImage: base64 })
          }
        />
      </div>
      <button type="submit" className="save">
        {currentId ? "Update" : "Save"}
      </button>
      <button className="clear" onClick={clear} type="button">
        Clear
      </button>
      {errorText && <div className="error-msg">{errorText}</div>}
    </form>
  );
};

export default Form;
