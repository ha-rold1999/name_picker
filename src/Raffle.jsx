/* eslint-disable react/prop-types */

export default function Raffle({ winners, isStart, start, setIsStart }) {
  return (
    <div className="flex justify-center items-center flex-col space-y-2">
      <div>
        <div className="text-6xl font-extrabold">
          {winners.FirstName} {winners.LastName}
        </div>
      </div>
      {!isStart ? (
        <button
          className="bg-green-500 px-10 py-1 text-lg text-white rounded-lg font-bold"
          onClick={() => {
            start();
            setIsStart(true);
          }}>
          Start
        </button>
      ) : (
        <div>Running</div>
      )}
    </div>
  );
}
