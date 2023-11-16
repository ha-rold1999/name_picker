import { useState, useEffect } from "react";
import Winner from "./Winner";
import Raffle from "./Raffle";
import Prizes from "./Prizes";

function App() {
  const data = JSON.parse(localStorage.getItem("activeList"));
  const names = data ? [...data] : [];
  const prizes = ["iPhone", "TV", "House & Lot"];

  const [winners, setWinnder] = useState({
    FirstName: "Full Scale Year End Party",
  });
  const [isStart, setIsStart] = useState(false);
  const [won, setWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [prize, setPrize] = useState("");

  const start = () => {
    setWon(false);
    const interval = setInterval(() => {
      setWinnder(names[Math.floor(Math.random() * names.length)]);
    }, 100);

    // Stop the interval after 5 seconds
    const duration = setTimeout(() => {
      clearInterval(interval);
      setIsStart(false);
      setWon(true);
    }, 5000);
    return () => {
      clearTimeout(duration);
    };
  };

  useEffect(() => {
    if (won) {
      // Delay rendering Winner by 1 second
      const timeoutId = setTimeout(() => {
        setShowWinner(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [won]);

  return (
    <div className={"h-screen flex justify-center items-center flex-col"}>
      {prize.length == 0 ? (
        <Prizes setPrize={setPrize} prizes={prizes} />
      ) : (
        <>
          {showWinner ? (
            <Winner winner={winners} setWon={setShowWinner} prize={prize} />
          ) : (
            <>
              <div>{prize}</div>
              {names.length > 0 ? (
                <Raffle
                  winners={winners}
                  isStart={isStart}
                  start={start}
                  setIsStart={setIsStart}
                />
              ) : (
                <div>No Participants</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
