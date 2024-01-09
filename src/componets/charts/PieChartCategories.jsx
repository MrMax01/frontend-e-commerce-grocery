import React from "react";
import { useSelector } from "react-redux";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const PieChartCategories = () => {
  const orders = useSelector((state) => state.orders.content);

  // Creare un oggetto per conteggiare le categorie
  const categoryCount = {};

  // Contare le categorie dagli ordini
  orders.forEach((order) => {
    const category = order.product.category; // Sostituisci 'category' con il nome della tua proprietà categoria
    if (categoryCount[category]) {
      categoryCount[category] += 1;
    } else {
      categoryCount[category] = 1;
    }
  });

  // Trasformare l'oggetto conteggio in un array di oggetti per il grafico a torta
  const data = Object.keys(categoryCount).map((category) => ({
    name: category,
    value: categoryCount[category],
  }));

  // Ordinare l'array in base al numero di ordinazioni in modo decrescente
  data.sort((a, b) => b.value - a.value);

  // Adesso 'data' contiene l'array ordinato con le categorie più ordinate
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartCategories;
