import React from "react";

import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { updateBlog, getBlog, deleteBlog } from "../reducers/bloglistReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";

function BlogDetails({ blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLike = (blog) => {
    // adds one like to the blog post in the database and updates the state of the blog list
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    console.log(updatedBlog);

    blogService.update(blog.id, updatedBlog).then((res) => {
      console.log(res);
      dispatch(updateBlog(res));
    });
  };

  const handleDelete = (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      ) === false
    )
      return;
    blogService.remove(blogToDelete.id).then(() => {
      dispatch(deleteBlog(blogToDelete));
    });
    navigate("/");
  };

  if (!blog) {
    return null;
  }

  return (
    <div className=" flex flex-col gap-12">
      <div className="flex flex-row gap-6 items-end">
        <h2 className="text-6xl font-bold">{blog.title}</h2>
        <h4 className="text-xl font-medium">{blog.author}</h4>
      </div>
      <div className="flex flex-col gap-6 items-start">
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-[#0000EE]"
        >
          {blog.url}
        </a>
        <div className="flex flex-row items-center gap-4">
          {blog.likes} likes{" "}
          <button onClick={() => handleLike(blog)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-600 hover:scale-125"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <span>Added by</span>
          <span className="font-semibold">{user.name}</span>
        </div>
        <h3>Comments</h3>
        <CommentForm blog={blog}></CommentForm>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.comment}</li>
          ))}
        </ul>

        {blog.user.name === user.name && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 font-bold"
            id="deleteButton"
            onClick={() => handleDelete({ ...blog, user: blog.user.id })}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
