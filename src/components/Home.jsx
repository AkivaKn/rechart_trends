import { useEffect, useState } from "react";
import { getProductBenchmarks } from "../data";
import {
  calculateTotalsByProvider,
  convertCurrencyToEuros,
  showProductPaymentTrends,
} from "../utils";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
      console.log(productPaymentTrends);
      setProductTrends(productPaymentTrends);
    };
    fetchBenchmarks();
  }, []);

  const yAxisFormatter = (value) =>
    `${new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value)}`;
  return (
    <>
      <h1>Payment Data</h1>
      <section>
        <h2>Totals by Provider</h2>
        <ul>
          {providerTotals.map((provider, index) => {
            return (
              <li key={index}>
                <h3>{provider.provider_name}</h3>
                <p>
                  Payment:
                  {new Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "EUR",
                  }).format(provider.total_payment)}
                </p>
                <p>
                  Benchmark:{" "}
                  {new Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "EUR",
                  }).format(provider.total_benchmark)}
                </p>
                <>
                  Benchmark difference:{" "}
                  {new Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "EUR",
                  }).format(provider.total_benchmark - provider.total_payment)}
                </>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2>Payment Trends by Product</h2>
        <ul>
          {productTrends.map((product, index) => {
            return (
              <li key={index}>
                <h3>{product.product_name}</h3>
                <LineChart
                  width={500}
                  height={300}
                  data={product.product_trends}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 60,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={yAxisFormatter} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="payment"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" />
                </LineChart>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
