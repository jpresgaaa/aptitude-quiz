function Main({ children, subject, caps }) {
  return (
    <div className="main">
      <p className="subject">{caps(subject)}</p>
      {children}
    </div>
  );
}

export default Main;
