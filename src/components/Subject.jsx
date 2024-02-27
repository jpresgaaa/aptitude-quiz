function Subject({ subject, onRadioChange, displayName }) {
  return (
    <>
      <input
        type="radio"
        name="subject"
        id={subject}
        value={subject}
        onChange={onRadioChange}
      />
      <label htmlFor={subject}>{displayName}</label>
    </>
  );
}

export default Subject;
