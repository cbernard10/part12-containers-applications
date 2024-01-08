import React from "react";

import { useState } from "react";
import { addComment } from "../reducers/bloglistReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function CommentForm({ blog }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blog.id, comment);
    dispatch(addComment(blog, comment));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-fit flex flex-row gap-4"
    >
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border-2 border-gray-500 rounded-xl px-3 py-2"
      />
      <button
        type="submit"
        className=" border-2 border-black px-6 py-2 rounded-3xl hover:bg-gray-200"
      >
        Add comment
      </button>
    </form>
  );
}

export default CommentForm;
