function Option({
  optionNum,
  option,
  letter,
  dispatch,
  userAnswer,
  activeQuestion,
}) {
  const hasAnswer = userAnswer !== null;
  return (
    <div
      className={`option option${optionNum} ${
        activeQuestion.options.length === 3 ? "three" : ""
      }`}
    >
      <button
        className={`option-btn ${
          optionNum === userAnswer
            ? optionNum === activeQuestion.answer
              ? "correct disabled"
              : "wrong disabled"
            : ""
        } ${
          hasAnswer
            ? optionNum === activeQuestion.answer
              ? "correct disabled"
              : "disabled"
            : ""
        }`}
        value={optionNum}
        onClick={() =>
          dispatch({ type: "newAnswer", payload: Number(optionNum) })
        }
      >
        <div className="letter">{letter}</div>
        <div className="choice">{option}</div>
      </button>
    </div>
  );
}

export default Option;
