
import axios from "axios";

export function getTrending() {
  const data = axios.get("https://api.coingecko.com/api/v3/search/trending").then((response) => {
    console.log(response);
    return response.data.coins;
  }).catch((error) => {
    console.log(error);
  })

  return data;
}