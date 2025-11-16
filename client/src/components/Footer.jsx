export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--nav-bg)",
      color: "var(--nav-text)",
      textAlign: "center",
      padding: "15px 0",
      marginTop: 40,
      borderTop: "1px solid rgba(255,255,255,0.1)"
    }}>
      <p>© {new Date().getFullYear()} Blog+. All rights reserved.</p>
    </footer>
  );
}
