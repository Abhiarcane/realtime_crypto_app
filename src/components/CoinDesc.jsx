import React from "react";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Audio } from "react-loader-spinner";
import ReadMore from "./ReadMore";

export default function CoinDesc({ coin }) {
  return (
    <div className="p-4 md:p-6 bg-gray-800 rounded-lg">
      <div className="text-2xl font-bold text-amber-500 mb-2">
        {coin.name ? coin.name.toUpperCase() : "No Name Available"}
      </div>
      <div className="text-white text-justify mb-4">
        {coin.desc ? <ReadMore text={coin.desc} /> : "No Description Available"}
      </div>
      <div className="flex flex-col gap-4 md:gap-6 mb-4">
        <div className="flex items-center">
          <div className="text-amber-500 font-normal text-lg mr-2">
            Market Cap:
          </div>
          <div className="text-lg text-green-500 font-semibold">{`$${coin.market_cap}`}</div>
        </div>
        <div className="flex items-center">
          <div className="text-amber-500 font-normal text-lg mr-2">
            Current Price:
          </div>
          <div className="text-lg text-green-500 font-semibold">{`$${coin.current_price}`}</div>
        </div>
        <div className="flex items-center">
          <div className="text-amber-500 font-normal text-lg mr-2">
            Total Volume:
          </div>
          <div className="text-lg text-green-500 font-semibold">{`$${coin.total_volume}`}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex flex-col bg-gray-700 p-4 rounded gap-2 items-center">
          <div className="text-white text-center">24h</div>
          <div
            className={`flex items-center ${
              coin.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {coin.price_change_percentage_24h < 0 ? (
              <ArrowDownwardRoundedIcon />
            ) : (
              <ArrowUpwardRoundedIcon />
            )}
            {coin.price_change_percentage_24h}%
          </div>
        </div>
        <div className="flex flex-col bg-gray-700 p-4 rounded gap-2 items-center">
          <div className="text-white text-center">7d</div>
          <div
            className={`flex items-center ${
              coin.price_percentage_7d < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {coin.price_percentage_7d < 0 ? (
              <ArrowDownwardRoundedIcon />
            ) : (
              <ArrowUpwardRoundedIcon />
            )}
            {coin.price_percentage_7d}%
          </div>
        </div>
        <div className="flex flex-col bg-gray-700 p-4 rounded gap-2 items-center">
          <div className="text-white text-center">14d</div>
          <div
            className={`flex items-center ${
              coin.price_change_percentage_14d < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {coin.price_change_percentage_14d < 0 ? (
              <ArrowDownwardRoundedIcon />
            ) : (
              <ArrowUpwardRoundedIcon />
            )}
            {coin.price_percentage_14d}%
          </div>
        </div>
        <div className="flex flex-col bg-gray-700 p-4 rounded gap-2 items-center">
          <div className="text-white text-center">30d</div>
          <div
            className={`flex items-center ${
              coin.price_change_percentage_30d < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {coin.price_change_percentage_30d < 0 ? (
              <ArrowDownwardRoundedIcon />
            ) : (
              <ArrowUpwardRoundedIcon />
            )}
            {coin.price_percentage_30d}%
          </div>
        </div>
        <div className="flex flex-col bg-gray-700 p-4 rounded gap-2 items-center">
          <div className="text-white text-center">1y</div>
          <div
            className={`flex items-center ${
              coin.price_change_percentage_1y < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {coin.price_change_percentage_1y < 0 ? (
              <ArrowDownwardRoundedIcon />
            ) : (
              <ArrowUpwardRoundedIcon />
            )}
            {coin.price_percentage_1y}%
          </div>
        </div>
      </div>
    </div>
  );
}
