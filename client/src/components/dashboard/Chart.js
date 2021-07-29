import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default function Chart(props) {
	const theme = useTheme();

	return (
		<React.Fragment>
			<Title>Today</Title>
			<ResponsiveContainer>
				<LineChart
					data={props.data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}>
					<XAxis dataKey="date" stroke={theme.palette.text.secondary} />
					<YAxis stroke={theme.palette.text.secondary}>
						<Label
							angle={270}
							position="left"
							style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}>
							Mails sent
						</Label>
					</YAxis>
					<Line
						type="monotone"
						dataKey="sent"
						stroke={theme.palette.primary.main}
						dot={true}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
