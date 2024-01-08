import React, { useEffect } from "react";

import userService from "../services/users";
import { useState } from "react";

function User({ user }) {
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     userService.getUser
  if (!user) {
    return null;
  }
  return (
    <div className=" flex flex-col gap-12">
      <h2 className="text-5xl font-bold">{user.name}</h2>
      <h3 className="text-3xl font-semibold">Added blogs:</h3>
      <ul className="flex flex-col gap-2">
        {user.blogs.map((blog) => (
          <li
            key={blog.id}
            className="text-[#00E] hover:underline font-semibold hover:cursor-pointer"
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
