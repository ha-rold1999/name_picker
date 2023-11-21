import { Payload } from "./Data";
import { FetchDatabase } from "./Util/Database";
import DurationOptions from "./DurationOptions";
import PrizeOptions from "./PrizeOptions";

/* eslint-disable react/prop-types */
export default function Prizes({
  setPrize,
  setLimit,
  durations,
  prizes,
  prize,
  limiter,
  setIsStartRaffle,
}) {
  return (
    <div className="flex flex-col space-y-3 items-center  w-1/4 bg-white p-4 rounded-lg">
      <div className="flex flex-col w-full">
        <div className="text-2xl font-bold">Select Prize</div>
        <div className="text-xs text-grey">
          Choose a prize and the duration of the raffle draw.
        </div>
      </div>

      <PrizeOptions setPrize={setPrize} prizes={prizes} />
      <DurationOptions setLimit={setLimit} durations={durations} />
      <button
        className={`bg-button w-full py-2 text-white rounded-md ${
          prize.length > 0 && limiter > 0 ? "bg-button" : "bg-grey"
        }`}
        disabled={!(prize.length > 0 && limiter > 0)}
        onClick={() => setIsStartRaffle(true)}
      >
        Start Raffle
      </button>
    </div>
  );
}
