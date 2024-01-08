import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);

  if (!user) return null;

  return (
    <li className="hover:underline text-[#00E] font-semibold hover:cursor-pointer text-2xl">
      {blog && <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
    </li>
  );
};

export default Blog;
