
import axios from "axios";
export function getNews() {


  const data = axios.get(
    `https://api.coingecko.com/api/v3/news`
  ).then((response) => {
    return response.data.data;
  }).catch((error) => {
    console.log(error.message);
  })

  return data;
}