import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Notification from "./Notification";
import LoginForm from "./components/LoginForm";
import usersService from "./services/users";
import blogService from "./services/blogs";
import { setBloglist } from "./reducers/bloglistReducer";

import Userlist from "./components/Userlist";
import User from "./components/User";
import Menu from "./components/Menu";
import BlogDetails from "./components/BlogDetails";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user);
  const bloglist = useSelector((state) => state.bloglist);

  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users);
    });
    blogService.getAll().then((blogs) => {
      dispatch(setBloglist(blogs));
    });
  }, [dispatch]);

  const matchUser = useMatch("/users/:id");
  const routeUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const routeBlog = matchBlog
    ? bloglist.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <div>
      <Menu />
      <Notification />
      <div className="max-w-[1000px] mx-auto py-8">
        <LoginForm />
        {user && (
          <Routes>
            <Route path="/users" element={<Userlist></Userlist>} />
            <Route path="/users/:id" element={<User user={routeUser} />} />
            <Route
              path="/blogs/:id"
              element={<BlogDetails blog={routeBlog} />}
            />
            <Route
              path="/"
              element={
                <>
                  <BlogList />
                  <BlogForm />
                </>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
