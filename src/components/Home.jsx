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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Home() {
  const [providerTotals, setProviderTotals] = useState([]);
  const [productTrends, setProductTrends] = useState([]);
  useEffect(() => {
    const fetchBenchmarks = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchBenchmarks();
  }, []);

  const yAxisFormatter = (value) =>
    `${new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value)}`;
  return (
    <div className="w-[90vw] px-6 md:px-10 " id="projects">
      <h1 className="md:text-4xl text-2xl font-extrabold text-gray-800 md:mb-8 mb-4">
        Payment Data
      </h1>
      <section className="w-full">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 md:mb-8 mb-4">
          Totals by Provider
        </h2>
        <ul>
          {providerTotals.map((provider, index) => {
            return (
              <li
                className="text-gray-800 mb-5 md:mb-10 pb-5 md:pb-10 border-b-2 border-gray-500"
                key={index}
              >
                <h3 className="md:text-2xl text-lg font-bold text-gray-700 md:mb-2 mb-1">
                  {provider.provider_name}
                </h3>
                <p className="md:text-lg text-sm text-gray-800 leading-relaxed md:mb-4 mb-2">
                  Payment:&nbsp;
                  {new Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "EUR",
                  }).format(provider.total_payment)}
                </p>
                <p className="md:text-lg text-sm text-gray-800 leading-relaxed md:mb-4 mb-2">
                  Benchmark:&nbsp;
                  {new Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "EUR",
                  }).format(provider.total_benchmark)}
                </p>
                <p
                  className={`md:text-lg text-sm ${
                    provider.total_benchmark - provider.total_payment < 0
                      ? "text-red-500"
                      : "text-green-600"
                  } leading-relaxed md:mb-4 mb-2`}
                >
                  Benchmark difference:&nbsp;
                  {new Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "EUR",
                  }).format(provider.total_benchmark - provider.total_payment)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="w-full">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 md:mb-8 mb-4">
          Payment Trends by Product
        </h2>
        <ul className="flex flex-wrap justify-center w-full gap-10">
          {productTrends.map((product, index) => {
            return (
              <li key={index} className="w-full lg:w-[30vw]">
                <h3 className="md:text-2xl text-lg font-bold text-gray-700 md:mb-5 mb-2 text-center">
                  {product.product_name}
                </h3>
                <ResponsiveContainer width="99%" aspect={1.5}>
                  <LineChart data={product.product_trends}>
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
                    <Line
                      type="monotone"
                      dataKey="benchmark"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
