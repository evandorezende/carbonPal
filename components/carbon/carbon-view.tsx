type IProps = {
  setResults: any;
  myResults: any;
};

export default function CarbonView({ setResults, myResults }: IProps) {
  return (
    <div className="flex flex-col gap-4 w-full bg-white border border-gray-200 rounded-md p-3 md:p-6">
      <h2 className="text-black font-semibold text-xl">Results</h2>
      <p className="text-black mb-4">
        You have{" "}
        <span className="bg-amber-200 rounded-md p-1">
          <span className="font-semibold">{myResults.carbonFootprint}</span>{" "}
          tons CO2e
        </span>{" "}
        on this delivery.
      </p>
      <div className="grid grid-cols-2 gap-2 pb-4">
        <div className="border border-gray-300 p-2 rounded-md flex flex-col space-y-2">
          <p className="text-gray-600 text-sm">Equipament Used:</p>
          <p className="text-black">{myResults.equipment}</p>
        </div>
        <div className="border border-gray-300 p-2 rounded-md flex flex-col space-y-2">
          <p className="text-gray-600 text-sm">
            Total Weight transported (kg):
          </p>
          <p className="text-black">{myResults.weight}</p>
        </div>
        <div className="border border-gray-300 p-2 rounded-md flex flex-col space-y-2">
          <p className="text-gray-600 text-sm">
            Total Volume transported (m2):
          </p>
          <p className="text-black">{myResults.volume}</p>
        </div>
        <div className="border border-gray-300 p-2 rounded-md flex flex-col space-y-2">
          <p className="text-gray-600 text-sm">Necessary Trips:</p>
          <p className="text-black">4</p>
        </div>
        <div className="border border-gray-300 p-2 rounded-md flex flex-col space-y-2">
          <p className="text-gray-600 text-sm">Distance (km):</p>
          <p className="text-black">{myResults.distance}</p>
        </div>
      </div>
      <div className="border-t pt-8">
        <p className="text-black">
          Find below your estimated cost to offset this emission with carbon
          capture companies.
        </p>

        {myResults?.offset?.map((offset: any, index: number) => (
          <div
            key={index}
            className="border border-gray-300 p-2 rounded-md flex flex-col space-y-2 mt-4"
          >
            <p className="text-gray-600 text-sm">Company:</p>
            <p className="text-black">{offset.name}</p>
            <p className="text-gray-600 text-sm">Cost (€):</p>
            <p className="text-black">{offset.cost}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
        onClick={() => setResults(null)}
      >
        Calculate another delivery
      </button>
    </div>
  );
}
