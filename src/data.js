import axios from "axios";

export async function getProductBenchmarks() {
  try {
    const productBenchmarksResponse = await axios.get(
      "https://substantive.pythonanywhere.com/product_benchmarks",
      { headers: { "auth-key":  import.meta.env.VITE_AUTH_KEY } }
    );
    return productBenchmarksResponse.data.product_benchmarks;
  } catch (error) {
    console.log(error);
  }
}

export async function getExchangeRates() {
  try {
    const exchangeRatesResponse = await axios.get(
      "https://substantive.pythonanywhere.com/exchange_rates",
      { headers: { "auth-key": import.meta.env.VITE_AUTH_KEY, } }
    );
    return exchangeRatesResponse.data.exchange_rates;
  } catch (error) {
    console.log(error);
  }
}
