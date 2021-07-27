import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function BarGraphPoint(props) {
	return (
		<BarChart
			width={500}
			height={300}
			data={props.data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Bar dataKey="mails" fill="#8884d8" />
		</BarChart>
	);
}
