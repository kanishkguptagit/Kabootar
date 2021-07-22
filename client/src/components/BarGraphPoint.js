
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
    
    mails: 20
  },
  {
    name: "Opened",
    
    mails: 15
  },
  {
    name: "Clicked",
    
    mails: 10
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
      <Bar dataKey="mails" fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
}
