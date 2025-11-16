import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav>
      <div>
        <Link to="/">Blog</Link>
        {user && <Link to="/create">New Post</Link>}
      </div>

      <div>
        <button onClick={toggleTheme} style={{ marginRight: 10 }}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {user ? (
          <>
            <span style={{ marginRight: 10 }}>Hello, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user?.role === "admin" && (
            <Link to="/create-category" style={{ marginRight: 10 }}>New Category</Link>
        )}

      </div>
    </nav>
  );
}
