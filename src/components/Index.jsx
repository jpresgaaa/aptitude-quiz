function Index({ questionsQuantity, index }) {
  return (
    <div className="index">
      -- {index + 1} out of {questionsQuantity} questions --
    </div>
  );
}

export default Index;
