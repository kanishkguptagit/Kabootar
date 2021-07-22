
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Total Mail",
    
    pv: 20
  },
  {
    name: "Opened",
    
    pv: 15
  },
  {
    name: "Clicked",
    
    pv: 10
  }
];

export default function BarGraphPoint() {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="pv" fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
}
