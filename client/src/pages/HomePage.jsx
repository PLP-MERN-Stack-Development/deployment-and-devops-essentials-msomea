import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  API.get("/posts")
    .then((res) => {
      setPosts(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="container post-page">
      <h1>Latest Posts</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((p) => (
        <div key={p._id} className="post-card">
          <Link to={`/posts/${p._id}`}>
            <h3>{p.title}</h3>
          </Link>
          <p>{p.excerpt}</p>
          <small>By {p.author?.name}</small>
        </div>
      ))}
    </div>
  );
}
