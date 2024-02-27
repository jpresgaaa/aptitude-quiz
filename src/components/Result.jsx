import Button from "./Button";

function Result() {
  return (
    <div className="main">
      <p className="subject">GENERAL INFORMATION</p>
      <p className="result">You scored X out of X questions</p>
      <p className="average">80%</p>
      <p className="passed">YOU PASSED</p>
      <div className="buttons">
        <Button
          btnName={"BACK TO MAIN MENU"}
          btnType={"btn solid"}
          btnWidth={20}
          fontSize={15}
        />
        <Button
          btnName={"RESTART"}
          btnType={"btn"}
          btnWidth={20}
          fontSize={15}
        />
      </div>
    </div>
  );
}

export default Result;
