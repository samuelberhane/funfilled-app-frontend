import React from "react";
import Post from "./Post/Post";
import { useGlobalPostContext } from "../../hook/globalPostContext";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Posts = () => {
  const { dispatch, posts } = useGlobalPostContext();

  // fetch all posts and dispatch get posts action
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/posts", {
        method: "GET",
      });
      const json = await response.json();
      dispatch({ type: "GET_POSTS", payload: json });
    };
    fetchPosts();
  }, [dispatch]);

  // return circular loading
  if (!posts) return <CircularProgress />;

  return (
    <>
      <div className="posts">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </>
  );
};

export default Posts;
