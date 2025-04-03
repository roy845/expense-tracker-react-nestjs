import React from "react";

interface Props {
  loading: boolean;
  convertedAmount: number | null;
  amount: number;
  from: string;
  to: string;
}

const ConversionResult: React.FC<Props> = ({
  loading,
  convertedAmount,
  amount,
  from,
  to,
}) => {
  return (
    <div className="mt-4 text-center text-lg font-semibold">
      {loading ? (
        <p className="text-blue-500">Fetching latest rates...</p>
      ) : convertedAmount !== null ? (
        <p>
          {amount} {from} ={" "}
          <span className="text-green-500">{convertedAmount.toFixed(2)}</span>{" "}
          {to}
        </p>
      ) : (
        <p className="text-red-500">Error fetching conversion rate.</p>
      )}
    </div>
  );
};

export default ConversionResult;
