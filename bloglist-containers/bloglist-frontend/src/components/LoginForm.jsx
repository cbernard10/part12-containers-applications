import React from "react";
import { useState, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import { useSelector } from "react-redux";

function LoginForm() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log("user", user);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification({ message: "Logged in", type: "success" }, 1));
    } catch (exception) {
      dispatch(
        setNotification({ message: "Wrong credentials", type: "error" }, 1)
      );
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogListUser");
      dispatch(setUser(null));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("could not logout.");
    }
  };

  return (
    <div>
      {!user && (
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-fit items-start
           gap-4"
        >
          <div className="w-full flex flex-row gap-5 items-centers">
            <span>Username</span>
            <input
              className="p-1"
              id="usernameInput"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="w-full flex flex-row gap-5 items-center">
            <span>Password</span>
            <input
              className="p-1"
              id="passwordInput"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            type="submit"
            id="loginButton"
            className="bg-blue-500 px-6 py-2 rounded-2xl text-white font-bold self-end"
          >
            Login
          </button>
        </form>
      )}

      {/* {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )} */}
    </div>
  );
}

export default LoginForm;
