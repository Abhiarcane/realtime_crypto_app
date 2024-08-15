
export default function setCoinData(setState, data) {

  setState({
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    image: data.image.large,
    desc: data.description.en,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    total_volume: data.market_data.total_volume.usd,
    current_price: data.market_data.current_price.usd,
    market_cap: data.market_data.market_cap.usd,
    price_percentage_1y: data.market_data.price_change_percentage_1y,
    price_percentage_7d: data.market_data.price_change_percentage_7d,
    price_percentage_14d: data.market_data.price_change_percentage_14d,
    price_percentage_30d: data.market_data.price_change_percentage_30d,

  })

};