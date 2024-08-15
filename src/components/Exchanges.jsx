import React, { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { Audio } from "react-loader-spinner";
import "../styles/table.css";

const Exchanges = ({ coinId }) => {
  const [exchangeDetails, setExchangeDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const coinsPerPage = 10;

  function handlePageChange(event, value) {
    setPage(value);
  }

  const fetchExchanges = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/exchanges"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exchanges", error);
    }
  };

  const fetchCoinTickers = async (coinId) => {
    try {
      if (coinId) {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/tickers`
        );
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching coin tickers", error);
    }
  };

  useEffect(() => {
    const getDetailedExchangeData = async () => {
      const exchanges = await fetchExchanges();
      const tickers = await fetchCoinTickers(coinId);

      if (exchanges && tickers) {
        const exchangeMap = exchanges.reduce((map, exchange) => {
          map[exchange.id] = exchange;
          return map;
        }, {});

        const details = tickers.tickers.map((ticker) => {
          const exchange = exchangeMap[ticker.market.identifier];
          return {
            image: exchange ? exchange.image : null,
            pair: `${ticker.base}/${ticker.target}`,
            price: ticker.last,
            volume: ticker.volume,
            lastUpdated: ticker.timestamp,
            trustScore: exchange ? exchange.trust_score : null,
          };
        });

        setExchangeDetails(details);
        setLoading(false);
      }
    };

    getDetailedExchangeData();
  }, [coinId]);

  const startIndex = (page - 1) * coinsPerPage;
  const paginatedExchanges = exchangeDetails.slice(
    startIndex,
    startIndex + coinsPerPage
  );

  return (
    <div className="mb-10 px-4">
      {loading ? (
        <Audio />
      ) : (
        <>
          <h2 className="flex justify-center text-3xl font-semibold text-amber-500 mb-8">
            {coinId.charAt(0).toUpperCase() + coinId.slice(1)} Market Exchange
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="p-3">Logo</th>
                  <th className="p-3">Pair</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">24h Volume</th>
                  <th className="p-3">Last Updated</th>
                  <th className="p-3">Trust Score</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExchanges.map((detail, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="p-3">
                      <div className="flex items-center justify-center">
                        {detail.image && (
                          <img
                            src={detail.image}
                            alt="Exchange Logo"
                            className="w-12 h-12"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-3">{detail.pair}</td>
                    <td className="p-3">${detail.price}</td>
                    <td className="p-3">{detail.volume}</td>
                    <td className="p-3">
                      {new Date(detail.lastUpdated).toLocaleString()}
                    </td>
                    <td className="p-3">{detail.trustScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <PaginationComponent
        page={page}
        count={Math.ceil(exchangeDetails.length / coinsPerPage)}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Exchanges;
