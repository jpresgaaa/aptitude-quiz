import { useReducer, useEffect } from "react";
import Header from "./Header";
import Subjects from "./Subjects";
import Menu from "./Menu";
import Subject from "./Subject";
import Button from "./Button";
import Main from "./Main";
import Question from "./Question";
import Options from "./Options";
import Option from "./Option";
import Index from "./Index";
import ProgressBar from "./ProgressBar";
import Loading from "./Loading";
import Error from "./Error";
import Result from "./Result";

const initialState = {
  index: 0,
  subject: "",
  status: "",
  questions: [],
  userAnswer: null,
  points: 0,
  progress: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setSubject":
      return { ...state, subject: action.payload };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, state: "error" };
    case "dataLoading":
      return { ...state, status: "loading" };

    case "start":
      return {
        ...state,
        status: "active",
        questions: state.questions[`${state.subject}`],
      };
    case "newAnswer":
      const currQuestion = state.questions.at(state.index);
      const progressInc = 100 / state.questions.length;

      return {
        ...state,
        userAnswer: action.payload,
        points:
          action.payload === currQuestion.answer
            ? state.points++
            : state.points,
        progress: state.progress + progressInc,
      };
    case "next":
      return {
        ...state,
        index:
          state.index !== state.questions.length
            ? state.index + 1
            : state.index,
        userAnswer: null,
      };
    case "finish":
      return { ...state, status: "finished" };
    default:
  }
}

const subjects = ["general-information", "vocabulary", "mathematics", "logic"];

const choices = ["A", "B", "C", "D", "E"];

function App() {
  const [
    { subject, status, questions, index, userAnswer, points, progress },
    dispatch,
  ] = useReducer(reducer, initialState);

  const activeQuestion = questions[index];
  const questionsQuantity = questions.length;

  //Converts the name into display name
  const caps = (word) => {
    const wordArray = word.split("-").map((w) => w.toUpperCase());

    return wordArray.join(" ");
  };

  //Highlights a word if any
  const highlightWord = (sentence) => {
    const words = sentence.split(" ");
    return words.map((word, index) => (
      <span
        key={index}
        className={word === activeQuestion.highlighted ? "highlight" : ""}
      >
        {word}{" "}
      </span>
    ));
  };

  useEffect(
    function () {
      const abortController = new AbortController();
      async function getData() {
        try {
          dispatch({ type: "dataLoading" });

          const res = await fetch("http://localhost:8001/quiz-data-test");
          const data = await res.json();

          dispatch({ type: "dataReceived", payload: data });
        } catch (err) {
          dispatch({ type: "dataFailed" });
        }
      }

      getData();

      return () => {
        abortController.abort();
      };
    },
    [dispatch]
  );

  return (
    <div className="app">
      <div className="container">
        <Header />
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "active" && (
          <Main caps={caps} subject={subject}>
            <ProgressBar progress={progress} />
            <Question
              question={activeQuestion.question}
              highlightWord={highlightWord}
              index={index}
            />
            <Options>
              {activeQuestion.options.map((option, index) => (
                <Option
                  option={option}
                  optionNum={index + 1}
                  letter={choices[index]}
                  key={index + 1}
                  userAnswer={userAnswer}
                  dispatch={dispatch}
                  activeQuestion={activeQuestion}
                />
              ))}
            </Options>
            <Index questionsQuantity={questionsQuantity} index={index} />
            {userAnswer &&
              (index !== questionsQuantity - 1 ? (
                <Button
                  btnType={"btn next"}
                  btnName={"NEXT"}
                  onClick={() => dispatch({ type: "next" })}
                />
              ) : (
                <Button
                  btnType={"btn next"}
                  btnName={"FINISH"}
                  onClick={() => dispatch({ type: "finish" })}
                />
              ))}
          </Main>
        )}
        {status === "ready" && (
          <Menu>
            <Subjects>
              {subjects.map((subject) => (
                <Subject
                  subject={subject}
                  onRadioChange={(e) =>
                    dispatch({ type: "setSubject", payload: e.target.value })
                  }
                  key={subject}
                  displayName={caps(subject)}
                />
              ))}
            </Subjects>
            <Button
              btnType="btn"
              btnName="LET'S START"
              onClick={() => dispatch({ type: "start" })}
            />
          </Menu>
        )}
        {status === "finished" && <Result />}
      </div>
    </div>
  );
}

export default App;
