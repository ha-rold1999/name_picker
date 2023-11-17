import { useState, useEffect } from "react";
import Winner from "./Winner";
import Raffle from "./Raffle";
import Prizes from "./Prizes";
import { Payload } from "./Data";

function App() {
  const data = JSON.parse(localStorage.getItem("activeList"));
  const names = data ? [...data] : [];
  const prizes = ["iPhone", "TV", "House & Lot"];

  const [winner, setWinner] = useState({
    FirstName: Payload.Event.Name,
  });
  const [isStart, setIsStart] = useState(false);
  const [won, setWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [prize, setPrize] = useState("");
  const [SFX_WIN] = useState(new Audio("/media/kidscheer.mp3"));
  const [SFX_DRUM_ROLL] = useState(new Audio("/media/drumroll.mp3"));
  

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const startRaffle = async () => {
    // 50 - ~6.2 seconds
    // 60 - ~8.5 seconds
    // 80 - ~14.3 seconds
    let limit = 60;

    for(let time = 10; time < 10000; time += 4){
      if(limit-- == 0) break;
      let _winner = names[Math.floor(Math.random() * names.length)];
      // check if the previous winner is currently selected in random
      if(winner === _winner) continue;
      setWinner(_winner);
      // increment the delay overtime
      await sleep(time);
    }
    // expected that when the loop breaks or get's satisfied, we'll display the winner
    SFX_DRUM_ROLL.pause();
    SFX_DRUM_ROLL.currentTime = 0;
    SFX_WIN.play();
    setIsStart(false);
    setWon(true);
  }

  const start = async () => {
    setWon(false);
    SFX_DRUM_ROLL.play();
    SFX_WIN.pause();
    SFX_WIN.currentTime = 0;
    await sleep(500);
    // let incOvertime = 100;
    // const interval = setInterval(async () => {
    //   let _winner = names[Math.floor(Math.random() * names.length)];
    //   setWinner(_winner);
    // }, 100);

    startRaffle();

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

  const Reset = () => {
    setWinner({
      FirstName: Payload.Event.Name,
    })
  }

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
    <div className={"h-screen flex bg-green-200 justify-center items-center flex-col"}>
      {prize.length == 0 ? (
        <Prizes setPrize={setPrize} prizes={prizes} />
      ) : (
        <>
          {showWinner ? (
            <Winner winner={winner} setWon={setShowWinner} prize={prize} reset={Reset} />
          ) : (
            <>
              <div>{prize}</div>
              {names.length > 0 ? (
                <Raffle
                  winner={winner}
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
