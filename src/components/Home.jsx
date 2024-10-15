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
  return <h1>Home page</h1>;
}
