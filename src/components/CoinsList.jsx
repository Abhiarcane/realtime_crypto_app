import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import PaginationComponent from "./PaginationComponent";
import { useDispatch } from "react-redux";
import { showSearchBar } from "../redux/searchBarSlice";
import "../styles/coins.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Trending from "./Trending";
import { Audio } from "react-loader-spinner";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filteredCoins, setFilteredCoins] = useState([]);

  const coinsPerPage = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showSearchBar());
  }, [dispatch]);

  const onSearch = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    filterCoins(searchQuery);
  };

  const filterCoins = (searchQuery) => {
    const filtered = cryptos.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCoins(filtered);
    setPage(1);
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptos(response.data);
        setFilteredCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from CoinGecko", error);
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return (
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
    );
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * coinsPerPage;
  const paginatedCoins = filteredCoins.slice(
    startIndex,
    startIndex + coinsPerPage
  );

  return (
    <div>
      <ResponsiveAppBar search={search} onSearch={onSearch} />
      <Trending />

      <div className="flex mb-4">
        <div className="mt-8">
          <div className="flex ml-10 text-3xl font-semibold text-white">
            List of Coins
          </div>
          <ul className="flex justify-center flex-wrap mb-8">
            {paginatedCoins.map((coin) => (
              <Coin coins={coin} loading={loading} key={coin.id} />
            ))}
          </ul>
        </div>
      </div>

      <PaginationComponent
        page={page}
        count={Math.ceil(filteredCoins.length / coinsPerPage)}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CryptoList;
