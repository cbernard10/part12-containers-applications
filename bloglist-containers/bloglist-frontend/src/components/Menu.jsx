import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";

function Menu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogListUser");
      dispatch(setUser(null));
      navigate("/");
    } catch (exception) {
      console.log("could not logout.");
    }
  };

  return (
    <div className="flex flex-row gap-8 bg-gray-100  justify-center items-center py-4">
      <span className="hover:underline">
        <Link to="/">Blogs</Link>
      </span>
      <span className="hover:underline">
        <Link to="/users">Users</Link>
      </span>
      <span>
        {user ? (
          <div className="flex flex-row items-center gap-6">
            <div>
              Logged in as <span className="font-semibold">{user.name}</span>
            </div>
            <button
              className="border-2 border-black rounded-3xl px-4 py-2 hover:bg-gray-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </span>
    </div>
  );
}

export default Menu;
