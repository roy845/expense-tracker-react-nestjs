import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: { date: string; rate: number }[];
  isDarkMode: boolean;
}

const HistoricalChart: React.FC<Props> = ({ data, isDarkMode }) => (
  <div className="mt-6 flex justify-center">
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid
        strokeDasharray="3 3"
        stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
      />
      <XAxis dataKey="date" stroke={isDarkMode ? "#E5E7EB" : "#374151"} />
      <YAxis stroke={isDarkMode ? "#E5E7EB" : "#374151"} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="rate"
        stroke="#3b82f6"
        strokeWidth={2}
        dot={{ r: 5 }}
      />
    </LineChart>
  </div>
);

export default HistoricalChart;
