import React from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/bloglistReducer";

import blogService from "../services/blogs";

function BlogList({ user }) {
  const dispatch = useDispatch();
  const bloglist = useSelector((state) => state.bloglist);

  const handleDelete = (blogToDelete) => {
    blogService.remove(blogToDelete.id).then(() => {
      dispatch(deleteBlog(blogToDelete));
    });
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      <h2 className="text-5xl font-bold">Blogs</h2>
      <ul className="flex flex-col gap-4">
        {bloglist.map((blog) => (
          <div key={blog.id} style={{ display: "flex", gap: "12px" }}>
            <Blog blog={blog} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
