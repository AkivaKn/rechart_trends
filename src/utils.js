import { getExchangeRates } from "./data";

export async function convertCurrencyToEuros(productBenchmarksData) {
  const productBenchmarksWithYearKey = [];
  productBenchmarksData.forEach((product) => {
    const productWithYear = { ...product };
    productWithYear.year = new Date(product.start_date).getFullYear();
    productBenchmarksWithYearKey.push(productWithYear);
  });
  const exchangeRates = await getExchangeRates();
  const productBenchmarksInEuros = productBenchmarksWithYearKey.map(
    (product) => {
      if (product.currency.id === 3) {
        return product;
      } else {
        const conversionRate = exchangeRates.filter((exchangeRate) => {
          return (
            exchangeRate.from_currency_id === product.currency.id &&
            exchangeRate.to_currency_id === 3 &&
            exchangeRate.year === product.year
          );
        });
        const convertedPayment =
          product.payment * conversionRate[0].exchange_rate;
        const convertedBenchmark =
          product.benchmark * conversionRate[0].exchange_rate;
        product.payment = convertedPayment;
        product.benchmark = convertedBenchmark;
        product.currency = { id: 3, name: "EUR", symbol: "€" };
        return product;
      }
    }
  );
  return productBenchmarksInEuros;
}

function categoriseBenchmarks(productBenchmarks, key) {
  const categorisedBenchmarks = {};
  productBenchmarks.forEach((product) => {
    categorisedBenchmarks[product[key]] =
      categorisedBenchmarks[product[key]] || [];
    categorisedBenchmarks[product[key]].push(product);
  });
  return categorisedBenchmarks;
}

export function calculateTotalsByProvider(productBenchmarks) {
  const benchmarksByProvider = categoriseBenchmarks(
    productBenchmarks,
    "provider_name"
  );
  const totalsByProvider = [];
  for (const provider in benchmarksByProvider) {
    let totalPayment = 0;
    let totalBenchmark = 0;
    benchmarksByProvider[provider].forEach((product) => {
      totalPayment += product.payment;
      totalBenchmark += product.benchmark;
    });
    totalsByProvider.push({
      provider_name: provider,
      total_payment: totalPayment,
      total_benchmark: totalBenchmark,
    });
  }
  return totalsByProvider;
}
export function showProductPaymentTrends(productBenchmarks) {
  const benchmarksByProduct = categoriseBenchmarks(
    productBenchmarks,
    "product_name"
  );
  const paymentTrends = [];
  for (const product in benchmarksByProduct) {
    if (benchmarksByProduct[product].length > 1) {
      paymentTrends.push({
        product_name: product,
        product_trends: benchmarksByProduct[product],
      });
    }
  }
  return paymentTrends;
}
