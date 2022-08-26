import { FC, useEffect, useRef, useState } from "react";

const GameBoard: FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(30);
  const [word, setWord] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const inputRef = useRef();

  //@ts-ignore
  String.prototype.randomize = function () {
    let array = Array.from(this).map((val, index) => this[index]);
    array.sort(() => 0.5 - Math.random());
    const string = array.reduce((string, word) => (string += word), "");
    return string;
  };

  useEffect(() => {
    if (gameStarted) {
      fetch("https://random-word-api.herokuapp.com/word?length=5")
        .then((res) => res.json())
        .then((data) => setWord(data[0].toUpperCase()));
    }
    const timing = setInterval(() => {
      if (gameStarted === true) {
        setTime((prev) => prev - 1);
      } else {
        clearInterval(timing);
      }
    }, 1000);

    return () => clearInterval(timing);
  }, [gameStarted]);

  useEffect(() => {
    if (time === 0) {
      setGameStarted(false);
      setWord("");
      setTime(difficulty === "easy" ? 30 : difficulty === "hard" ? 10 : 20);
    }
  }, [time]);

  useEffect(() => {
    //@ts-ignore
    setRandomWord(word.randomize().toUpperCase());
    console.log(word);
  }, [word]);

  useEffect(() => {
    console.log(input);
    if (input === word && input !== "") {
      setTime(difficulty === "easy" ? 30 : difficulty === "hard" ? 10 : 20);
      setScore((prev) => prev + 1);
      fetch("https://random-word-api.herokuapp.com/word")
        .then((res) => res.json())
        .then((data) => setWord(data[0].toUpperCase()));
    }
  }, [input]);

  return (
    <div
      className={`w-1/3 min-w-[300px] max-w-[460px] ${
        gameStarted ? "p-5" : ""
      } px-7 bg-white my-10 rounded-md flex flex-col items-center`}
    >
      {/* @ts-ignore */}
      <p className="text-4xl tracking-widest font-light">{randomWord}</p>
      <input
        type="text"
        className="w-full bg-gray-100 rounded-md p-3 mt-10 mb-5 outline-none focus:bg-gray-200"
        placeholder="Your Answer"
        // @ts-ignore
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
      />
      <div className={`self-start ${gameStarted ? "hidden" : ""}`}>
        <h2 className="text-2xl my-2">Difficulty</h2>
        <div className="my-2">
          <input
            type="radio"
            id="easy"
            name="difficulty"
            onClick={() => {
              setDifficulty("easy");
              setTime(30);
            }}
          />
          <label htmlFor="easy" className="mx-2">
            Easy
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            name="difficulty"
            id="medium"
            onClick={() => {
              setDifficulty("medium");
              setTime(20);
            }}
          />
          <label htmlFor="medium" className="mx-2">
            Medium
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            value="hard"
            id="hard"
            name="difficulty"
            onClick={() => {
              setDifficulty("hard");
              setTime(10);
            }}
          />
          <label htmlFor="hard" className="mx-2">
            Hard
          </label>
        </div>
      </div>
      <h2 className="text-xl my-1 self-start">Score: {score}</h2>
      <h2 className="text-xl my-1 self-start">Time Left: {time}s</h2>
      <button
        disabled={gameStarted ? true : false}
        className="w-full my-7 py-3 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-600 duration-500 disabled:bg-gray-500 disabled:text-gray-400"
        onClick={() => {
          setScore(0);
          // @ts-ignore
          inputRef.current.focus();
          setGameStarted(true);
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameBoard;
