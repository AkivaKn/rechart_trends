import { useEffect, useState } from "react";
import { getProductBenchmarks } from "../data";
import {
  calculateTotalsByProvider,
  convertCurrencyToEuros,
  showProductPaymentTrends,
} from "../utils";

export default function Home() {
  const [providerTotals, setProviderTotals] = useState([]);
  const [productTrends, setProductTrends] = useState([]);
  useEffect(() => {
    const fetchBenchmarks = async () => {
      const productBenchmarks = await getProductBenchmarks();
      const productBenchmarksInEuros = await convertCurrencyToEuros(
        productBenchmarks
      );
      const calculatedTotals = calculateTotalsByProvider(
        productBenchmarksInEuros
      );
      setProviderTotals(calculatedTotals);
      const productPaymentTrends = showProductPaymentTrends(
        productBenchmarksInEuros
      );
      setProductTrends(productPaymentTrends);
    };
    fetchBenchmarks();
  }, []);
  return (
    <>
      <h1>Payment Data</h1>
      <h2>Totals by Provider</h2>
      <ul>
        {providerTotals.map((provider, index) => {
          return (
            <li key={index}>
              <h3>{provider.provider_name}</h3>
              <p>
                Payment: 
                {new Intl.NumberFormat('en-UK', {
                  style: "currency",
                  currency: "EUR",
                }).format(provider.total_payment)}
              </p>
              <p>Benchmark: {new Intl.NumberFormat('en-UK', {
                  style: "currency",
                  currency: "EUR",
              }).format(provider.total_benchmark)}</p>
                  <>Benchmark difference: {new Intl.NumberFormat('en-UK', {
                  style: "currency",
                  currency: "EUR",
              }).format(provider.total_benchmark - provider.total_payment)}</>
            </li>
          );
        })}
      </ul>
    </>
  );
}
