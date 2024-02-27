function Option({ optionNum, option, letter }) {
  return (
    <div className={`option option${optionNum}`}>
      <button className="">
        <div className="letter">{letter}</div>
        {option}
      </button>
    </div>
  );
}

export default Option;
