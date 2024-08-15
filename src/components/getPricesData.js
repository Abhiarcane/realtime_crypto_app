import axios from "axios";
export function getPricesData(id, days) {


  const data = axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=2`
  ).then((response) => {
    return response.data.prices;
  }).catch((error) => {
    console.log(error.message);
  })

  return data;
}