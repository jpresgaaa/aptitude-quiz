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
    default:
  }
}

const subjects = ["general-information", "vocabulary", "mathematics", "logic"];

const choices = ["A", "B", "C", "D", "E"];

function App() {
  const [{ subject, status, questions, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const activeQuestion = questions[index];

  //Converts the name into display name
  const caps = (word) => {
    const wordArray = word.split("-").map((w) => w.toUpperCase());

    return wordArray.join(" ");
  };

  useEffect(
    function () {
      const abortController = new AbortController();
      async function getData() {
        try {
          dispatch({ type: "dataLoading" });

          const res = await fetch("http://localhost:9000/quiz-data");
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
            <ProgressBar progress={50} />
            <Question question={activeQuestion.question} />
            <Options>
              {activeQuestion.options.map((option, index) => (
                <Option
                  option={option}
                  optionNum={index + 1}
                  letter={choices[index]}
                  key={index}
                />
              ))}
            </Options>
            <Index />
            <Button btnType={"btn next"} btnName={"NEXT"} />
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
