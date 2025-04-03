import MainLayout from "../layout/MainLayout";
import AmountInput from "../components/currency-converter/AmountInput";
import CurrencySelector from "../components/currency-converter/CurrencySelector";
import ConversionResult from "../components/currency-converter/ConversionResult";
import HistoricalChart from "../components/currency-converter/HistoricalChart";
import CurrencyConverterHeader from "../components/currency-converter/CurrencyConverterHeader";
import useCurrencyConverter from "../hooks/useCurrencyConverter";

const CurrencyConverter: React.FC = () => {
  const {
    CURRENCIES,
    amount,
    convertedAmount,
    fromCurrency,
    historicalData,
    isDarkMode,
    loading,
    setAmount,
    setFromCurrency,
    setToCurrency,
    toCurrency,
  } = useCurrencyConverter();

  return (
    <MainLayout title="Currency Converter">
      <div
        className={`max-w-2xl mx-auto p-6 rounded-lg shadow-lg transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-900 hover:bg-gray-100"
        }`}
      >
        <CurrencyConverterHeader />

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <AmountInput
            value={amount}
            onChange={setAmount}
            isDarkMode={isDarkMode}
          />
          <CurrencySelector
            selected={fromCurrency}
            onChange={setFromCurrency}
            currencies={CURRENCIES}
            isDarkMode={isDarkMode}
          />
          <CurrencySelector
            selected={toCurrency}
            onChange={setToCurrency}
            currencies={CURRENCIES}
            isDarkMode={isDarkMode}
          />
        </div>

        <ConversionResult
          loading={loading}
          convertedAmount={convertedAmount}
          amount={amount}
          from={fromCurrency}
          to={toCurrency}
        />

        <HistoricalChart data={historicalData} isDarkMode={isDarkMode} />
      </div>
    </MainLayout>
  );
};

export default CurrencyConverter;
