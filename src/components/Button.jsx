function Button({ btnType, btnName, btnWidth, fontSize, onClick }) {
  return (
    <button
      onClick={onClick}
      className={btnType}
      style={{ width: `${btnWidth}vw`, fontSize: `${fontSize}px` }}
    >
      {btnName}{" "}
      {btnType === "btn next" && <i className="bx bx-chevrons-right"></i>}
    </button>
  );
}

export default Button;
