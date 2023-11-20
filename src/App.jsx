import { useState, useEffect } from "react";
import Menu from "./Menu";
import Random from "./Random";

function App() {
  const data = JSON.parse(localStorage.getItem("activeList"));
  const names = data ? [...data] : [];
  const prizes = JSON.parse(localStorage.getItem("prizeList"));
  const durations = [50, 60, 80, 100];

  const [winner, setWinner] = useState(undefined);
  const [addPrize, setAddPrize] = useState(false);
  const [limiter, setLimit] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [won, setWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [prize, setPrize] = useState("");
  const [SFX_WIN] = useState(new Audio("/media/kidscheer.mp3"));
  const [SFX_DRUM_ROLL] = useState(new Audio("/media/drumroll.mp3"));

  const [refresh, setRefresh] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const startRaffle = async () => {
    // 50 - ~6.2 seconds
    // 60 - ~8.5 seconds
    // 80 - ~14.3 seconds
    let limit = limiter; // displayed on screen
    let divisibleBy2 = 0;
    let divisibleBy2_2 = 0;
    let displayed = 0;
    let _alreadyDisplayed = [];

    for (let time = 100; time < 10000; time) {
      let _winner = names[Math.floor(Math.random() * names.length)];
      // check if the previous winner is currently selected in random
      //if (winner === _winner) continue;
      if (_alreadyDisplayed.includes(_winner.id)) {
        // check if _alreadyDisplayed is full, if yes, reset.
        if (_alreadyDisplayed.length === names.length) {
          _alreadyDisplayed = [];
          console.log("_alreadyDisplayed was reset");
          continue;
        }
        continue;
      }

      if (limit-- == 0) break;
      if (divisibleBy2++ % 2 == 0) {
        if (divisibleBy2_2++ % 2 == 0) {
          time += 1;
        }
      }
      console.log(
        ++displayed + " - " + _winner.firstName + " " + _winner.lastName
      );

      _alreadyDisplayed.push(_winner.Id);
      //_alreadyDisplayed.push(_winner.id);

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
  };

  const start = async () => {
    setWon(false);
    SFX_DRUM_ROLL.play();
    SFX_WIN.pause();
    SFX_WIN.currentTime = 0;
    await sleep(500);

    startRaffle();
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
      }
    >
      {prize.length > 0 && limiter > 0 ? (
        <Random
          winner={winner}
          setWinner={setWinner}
          setShowWinner={setShowWinner}
          prize={prize}
          setWon={setWon}
          setPrize={setPrize}
          setLimit={setLimit}
          names={names}
          isStart={isStart}
          start={start}
          setIsStart={setIsStart}
          won={won}
          showWinner={showWinner}
        />
      ) : (
        <>
          <Menu
            setAddPrize={setAddPrize}
            addPrize={addPrize}
            setPrize={setPrize}
            setLimit={setLimit}
            durations={durations}
            prizes={prizes}
            names={names}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </>
      )}
    </div>
  );
}

export default App;
