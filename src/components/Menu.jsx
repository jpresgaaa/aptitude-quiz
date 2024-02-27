function Menu({ children }) {
  return (
    <div className="menu">
      <p>-- SELECT A SUBJECT --</p>
      {children}
    </div>
  );
}

export default Menu;
