import { useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const LineChartSales = () => {
  const orders = useSelector((state) => state.orders.content);
  const ordersByDate = orders.reduce((acc, order) => {
    const date = order.created_at; // Assumi che ci sia una proprietà createdAt nell'oggetto ordine
    if (!acc[date]) {
      acc[date] = 1;
    } else {
      acc[date] += 1;
    }
    return acc;
  }, {});
  const data = Object.entries(ordersByDate).map(([date, orderCount]) => ({
    name: date,
    orderCount,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="orderCount" stroke="#8884d8" activeDot={{ r: 8 }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineChartSales;
