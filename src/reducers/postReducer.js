import {
  GET_POSTS,
  CREATE_POST,
  SET_ID,
  UPDATE_POST,
  REMOVE_POST,
  REMOVE_ID,
} from "../variables/actionType";

// posts reducer function
export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload };
    case CREATE_POST:
      return { ...state, posts: [payload, ...state.posts] };
    case SET_ID:
      return { ...state, currentId: payload };
    case REMOVE_ID:
      return { ...state, currentId: null };
    case UPDATE_POST:
      const updatedPosts = state.posts.map((post) => {
        if (post._id === payload._id) {
          return payload;
        } else {
          return post;
        }
      });
      return { posts: updatedPosts, currentId: null };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    default:
      return state;
  }
};
