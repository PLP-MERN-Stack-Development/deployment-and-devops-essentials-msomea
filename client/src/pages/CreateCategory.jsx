import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function CategoryCreate() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await API.post("/categories", { name });
      alert("Category created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create category. Check console.");
    }
  };

  if (!user || user.role !== "admin") {
    return <p>Only admins can create categories.</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}
