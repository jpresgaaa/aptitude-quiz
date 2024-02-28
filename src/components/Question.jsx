function Question({ question, highlightWord, index }) {
  return (
    <>
      <div className="question">
        <div className="number">{index + 1}.</div>
        <p>{highlightWord(question)}</p>
      </div>
    </>
  );
}

export default Question;
