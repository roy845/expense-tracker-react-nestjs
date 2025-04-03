import Spinner from "../common/Spinner";

interface Props {
  selectedCurrency: string;
  currencies: { code: string; name: string }[];
  isDarkMode: boolean;
  loading: boolean;
  onChange: (currency: string) => void;
}

const CurrencySelector: React.FC<Props> = ({
  selectedCurrency,
  currencies,
  isDarkMode,
  loading,
  onChange,
}) => {
  return loading ? (
    <Spinner />
  ) : (
    <>
      <p className="text-sm mb-4">
        Choose the currency symbol that will be displayed in your transaction
        amounts.
      </p>
      <select
        className={`border p-2 rounded w-full ${
          isDarkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
        value={selectedCurrency}
        onChange={(e) => onChange(e.target.value)}
      >
        {currencies.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CurrencySelector;
