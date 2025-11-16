import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await API.post(`/posts/${id}/comments`, { content: comment });
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="container post-page">
      <h1>{post.title}</h1>
      <p style={{ color: "gray" }}>By {post.author?.name}</p>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8 }}
        />
      )}
      <p style={{ marginTop: 20 }}>{post.content}</p>

      <hr style={{ margin: "30px 0" }} />

      <h3>Comments ({post.comments?.length || 0})</h3>

      {post.comments?.length > 0 ? (
        post.comments.map((c, i) => (
          <div key={i} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
            <p style={{ margin: 0 }}>{c.content}</p>
            <small style={{ color: "gray" }}>by {c.user?.name || "Anonymous"}</small>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      {user ? (
        <form onSubmit={handleCommentSubmit} className="create-post-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
            style={{ width: "100%", padding: 10, borderRadius: 6 }}
          />
          <button type="submit" style={{ marginTop: 10 }}>
            Add Comment
          </button>
        </form>
      ) : (
        <p style={{ color: "gray" }}>Login to add a comment.</p>
      )}
    </div>
  );
}
