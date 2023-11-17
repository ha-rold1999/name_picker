import { useState, useEffect } from "react";
import Winner from "./Winner";
import Raffle from "./Raffle";
import Prizes from "./Prizes";
import { Payload } from "./Data";

function App() {
  const data = JSON.parse(localStorage.getItem("activeList"));
  const names = data ? [...data] : [];
  const prizes = ["iPhone", "TV", "House & Lot"];

  const [winner, setWinner] = useState(undefined);
  const [isStart, setIsStart] = useState(false);
  const [won, setWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [prize, setPrize] = useState("");
  const [refresh, setRefresh] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const startRaffle = async () => {
    // 50 - ~6.2 seconds
    // 60 - ~8.5 seconds
    // 80 - ~14.3 seconds
    let limit = 60;

    for (let time = 10; time < 10000; time += 4) {
      if (limit-- == 0) break;
      let _winner = names[Math.floor(Math.random() * names.length)];
      // check if the previous winner is currently selected in random
      if (winner === _winner) continue;
      setWinner(_winner);
      // increment the delay overtime
      await sleep(time);
    }
    // expected that when the loop breaks or get's satisfied, we'll display the winner
    setIsStart(false);
    setWon(true);
  };

  const start = async () => {
    setWon(false);
    // let incOvertime = 100;
    // const interval = setInterval(async () => {
    //   let _winner = names[Math.floor(Math.random() * names.length)];
    //   setWinner(_winner);
    // }, 100);

    startRaffle();
    SFX_WIN;

    // Stop the interval after 5 seconds
    // const duration = setTimeout(() => {
    //   clearInterval(interval);
    //   setIsStart(false);
    //   setWon(true);
    //   console.log(winner);
    // }, 5000);
    // return () => {
    //   clearTimeout(duration);
    // };
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
    <div
      className={
        "h-screen flex bg-green-200 justify-center items-center flex-col"
      }>
      {prize.length == 0 ? (
        <Prizes
          setPrize={setPrize}
          prizes={prizes}
          attendies={names.length}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        <>
          {showWinner ? (
            <Winner
              winner={winner}
              setWinner={setWinner}
              setShowWinner={setShowWinner}
              prize={prize}
              setWon={setWon}
            />
          ) : (
            <>
              <button
                onClick={() => {
                  setPrize("");
                }}>
                Set New Pize
              </button>
              <div>{prize}</div>
              {names.length > 0 ? (
                <Raffle
                  winner={winner}
                  isStart={isStart}
                  start={start}
                  setIsStart={setIsStart}
                  won={won}
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
