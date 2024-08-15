import { getTrending } from "./getTrending";
import { useEffect, useState } from "react";

export default function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getTrending();
    if (data) {
      console.log(data);
      setTrending(data);
    }
  }

  return (
    <>
      <div className="mt-40">
        <div className="text-white text-3xl ml-10 mb-4 font-semibold">
          Trending Coins
        </div>
        <div className="flex overflow-x-scroll gap-4  mx-10">
          {trending.map((item) => (
            <div className="bg-gray-700 w-72 flex-shrink-0 p-4 rounded-lg">
              <div className="mb-2">
                <img
                  src={item.item.large}
                  alt=""
                  className="w-1/2 rounded-lg"
                />
              </div>
              <div className="text-white text-lg font-semibold">
                {item.item.name};
              </div>
              <div className="text-green-500">
                <span className="text-white">Price:</span> $
                {item.item.data.price.toFixed(2)}
              </div>
              <div className="text-green-500">
                <span className="text-white">Market Cap:</span>{" "}
                {item.item.data.market_cap}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
