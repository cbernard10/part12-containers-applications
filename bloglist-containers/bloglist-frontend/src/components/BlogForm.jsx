import { useState } from "react";

import { createBlog } from "../reducers/bloglistReducer";
import { useDispatch } from "react-redux";
import Togglable from "./Togglable";

const useBlogField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };
  const onReset = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    onReset,
  };
};

const BlogForm = () => {
  const dispatch = useDispatch();

  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const newBlog = useBlogField("text");
  const newUrl = useBlogField("text");
  const newAuthor = useBlogField("text");
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.value,
      author: newAuthor.value,
      url: newUrl.value,
    };
    dispatch(createBlog(blogObject));

    setBlogFormVisible(false);
    newBlog.onReset();
    newUrl.onReset();
    newAuthor.onReset();
  };

  return (
    <Togglable
      buttonLabel="Create new blog"
      visible={blogFormVisible}
      setVisible={setBlogFormVisible}
    >
      <h2 className="text-2xl font-bold">Create a new blog post</h2>

      <form
        onSubmit={handleCreateBlog}
        className="flex flex-col gap-3 items-start py-3"
      >
        <div className="flex flex-row justify-between items-center w-full">
          <span>Title</span>
          <input
            className="p-1 border-gray-600 border-2"
            value={newBlog.value}
            onChange={newBlog.onChange}
            id="titleInput"
          />
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <span>Author</span>
          <input
            className="p-1 border-gray-600 border-2"
            value={newAuthor.value}
            onChange={newAuthor.onChange}
            id="authorInput"
          />
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <span>Url</span>
          <input
            className="p-1 border-gray-600 border-2"
            value={newUrl.value}
            onChange={newUrl.onChange}
            id="urlInput"
          />
        </div>
        <button
          id="saveButton"
          type="submit"
          className="bg-transparent border-2 border-black px-5 py-1 text-black rounded-2xl hover:bg-gray-300 self-end"
        >
          Save
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
