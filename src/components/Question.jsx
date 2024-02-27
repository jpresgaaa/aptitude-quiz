function Question({ question }) {
  console.log(question);
  return (
    <>
      <div className="question">
        <div className="number">1.</div>
        <p>{question}</p>
      </div>
    </>
  );
}

export default Question;
