import React from "react";

import { useState, useEffect } from "react";
import usersService from "../services/users";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
  Link,
} from "react-router-dom";

function Userlist() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-5xl font-bold">Users</h2>
      <table className="max-w-[400px] border-2 border-gray-100 flex flex-col px-6 py-6 gap-6">
        <thead>
          <tr className="flex flex-row justify-between px-6 py-2">
            <th className="">User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-2">
          {users.map((user, i) => (
            <tr
              key={user.id}
              className="flex flex-row justify-between px-6 py-2"
              style={
                i % 2 === 0
                  ? { backgroundColor: "#f2f2f2" }
                  : { backgroundColor: "#fff" }
              }
            >
              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="font-semibold hover:underline text-[#00E]"
                >
                  {user.name}
                </Link>
              </td>
              <td>{Object.values(user.blogs).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Userlist;
