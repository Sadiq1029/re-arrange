import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-blue-100 flex items-center flex-col py-10">
      <h1 className="text-center text-3xl font-bold">Rearrange Game</h1>
      <p className="w-[80%] max-w-[600px] min-w-[300px] text-center my-5 text-xl">
        You have 30 seconds to rearrange the scrambled word. If you guess the
        correct word, you will get one point. Otherwise, the game will restart.
      </p>
      <GameBoard />
    </div>
  );
}

export default App;
