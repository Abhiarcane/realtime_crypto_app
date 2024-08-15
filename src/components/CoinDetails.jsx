import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import setCoinData from "./objects/setCoinData";
import LineChart from "./LineChart";
import { getCoinData } from "./getCoinData.js";
import { getPricesData } from "./getPricesData.js";
import { Audio } from "react-loader-spinner";
import CoinDesc from "./CoinDesc.jsx";
import Exchanges from "./Exchanges.jsx";
import News from "./News.jsx";
import { convertDate } from "./convertDate.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function CoinDetails() {
  const [coin, setCoindetail] = useState([]);
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDaysDropdownOpen, setIsDaysDropdownOpen] = useState(false);
  const [selectedVolumeOption, setSelectedVolumeOption] = useState("By Prices");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getData();
      getPrices();
    }
  }, [id, days]);

  async function getData() {
    const coinData = await getCoinData(id);
    if (coinData) {
      setCoinData(setCoindetail, coinData);
      setLoading(false);
    }
  }

  async function getPrices() {
    const pricesData = await getPricesData(id, days);
    if (pricesData) {
      setChartData({
        labels: pricesData.map((price) => convertDate(price[0])),
        datasets: [
          {
            data: pricesData.map((price) => price[1]),
            borderColor: "#3a80e9",
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: "rgb(58,128,233,0.1)",
            pointRadius: 0,
          },
        ],
      });
    }
  }

  const handleVolumeOptionClick = (option) => {
    setSelectedVolumeOption(option);
    setIsDropdownOpen(false);
  };

  const handleDaysOptionClick = (option) => {
    setDays(option);
    setIsDaysDropdownOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Audio
            height="100"
            width="300"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div className="bg-gray-800 flex flex-col md:flex-row pt-16 px-4 md:px-8 gap-8 md:gap-12 mb-24">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img src={coin.image} alt="" className="w-16 h-16" />
                <div>
                  <div className="uppercase font-semibold text-2xl">
                    {coin.symbol}
                  </div>
                  <div>{coin.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 font-semibold mb-6">
                <div className="text-3xl">{`$${coin.current_price} USD`}</div>
                <div
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500 text-xl"
                      : "text-red-500 text-xl"
                  }
                >
                  {coin.price_change_percentage_24h}%
                </div>
                <p className="text-xl">(24H)</p>
              </div>
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4 md:gap-2 mb-6">
                  <div className="w-full flex justify-between md:flex-row md:justify-between">
                    <div className="relative w-1/3 md:w-1/4">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-white text-gray-800 px-3 py-1 rounded w-full text-center flex justify-between items-center"
                      >
                        {selectedVolumeOption}
                        {isDropdownOpen ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg z-10">
                          <button
                            onClick={() => handleVolumeOptionClick("Volume")}
                            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700"
                          >
                            Volume
                          </button>
                          <button
                            onClick={() =>
                              handleVolumeOptionClick("Market Cap")
                            }
                            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700"
                          >
                            Market Cap
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="relative w-1/3 md:w-1/4">
                      <button
                        onClick={() =>
                          setIsDaysDropdownOpen(!isDaysDropdownOpen)
                        }
                        className="bg-white text-gray-800 px-3 py-1 rounded w-full text-center flex justify-between items-center"
                      >
                        {`${days} Days`}
                        {isDaysDropdownOpen ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </button>
                      {isDaysDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg z-10">
                          <button
                            onClick={() => handleDaysOptionClick(7)}
                            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700"
                          >
                            7 days
                          </button>
                          <button
                            onClick={() => handleDaysOptionClick(30)}
                            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700"
                          >
                            30 days
                          </button>
                          <button
                            onClick={() => handleDaysOptionClick(60)}
                            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700"
                          >
                            60 days
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <LineChart chartData={chartData} />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <CoinDesc coin={coin} loading={loading} />
          </div>
        </div>
      )}
      <div className="px-4">
        <Exchanges coinId={coin.id} />
        <News />
      </div>
    </>
  );
}
