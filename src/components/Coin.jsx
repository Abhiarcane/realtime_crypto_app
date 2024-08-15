import React from "react";
import { Link } from "react-router-dom";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Audio } from "react-loader-spinner";
const Coin = ({ coins }) => {
  return (
    <>
      <Link to={`/coin/${coins.id}`}>
        <li className="">
          <div className="coin-box">
            <div className="coin-img-box">
              <img src={coins.image} alt="" className="coin-img" />
              <div className="name-symb-box">
                <div className="coin-symb">{coins.symbol.toUpperCase()}</div>
                <div className="coin-name">{coins.name}</div>
              </div>
            </div>
            <div className="coin-rates">
              {coins.price_change_percentage_24h > 0 ? (
                <div className="coin-rates">
                  <span className="green">
                    {coins.price_change_percentage_24h}
                  </span>
                  <TrendingUpRoundedIcon className="icon-up green" />
                </div>
              ) : coins.price_change_percentage_24h < 0 ? (
                <div className="coin-rates">
                  <span className="red">
                    {coins.price_change_percentage_24h}
                  </span>
                  <TrendingDownRoundedIcon className="icon-down red" />
                </div>
              ) : (
                <div className="coin-rates">
                  <span className="red">NA</span>
                </div>
              )}
            </div>
            <div className="coin-price-box">
              <div
                className={
                  coins.price_change_percentage_24h > 0
                    ? "price-green"
                    : "price-red"
                }
              >{`$ ${coins.current_price.toLocaleString()}`}</div>
              <div className="coin-price">{`Market Cap: $${coins.market_cap.toLocaleString()}`}</div>
              <div className="coin-volume">{`Total Volume: ${coins.total_volume.toLocaleString()}`}</div>
            </div>
          </div>
        </li>
      </Link>
    </>
  );
};

export default Coin;
