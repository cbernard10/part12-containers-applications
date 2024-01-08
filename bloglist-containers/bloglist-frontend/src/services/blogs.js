import axios from "axios";

// const baseUrl = import.meta.env.VITE_BACKEND_URI + "/blogs";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("sending data to server", baseUrl, newBlog, config);
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, comment) => {
  console.log("adding comment", comment, "to blog", id);
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment: comment,
  });
  return response.data;
};

export default { getAll, setToken, create, update, remove, addComment };
