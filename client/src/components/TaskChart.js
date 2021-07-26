import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';

export default function Orders(props) {
	return (
		<React.Fragment>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							<strong>Date</strong>
						</TableCell>
						<TableCell>
							<strong>Tasks</strong>
						</TableCell>						
					</TableRow>
				</TableHead>
				<TableBody>
					{props.item.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.task}</TableCell>
							<TableCell>
								<Button
									// onClick={() => {
									// 	props.modalHandler(row.id);
									// }}
									size="x-small"
									variant="outlined"
									color="primary"
									style={{
										textTransform: 'none',
										maxWidth: '90px',
										maxHeight: '35px',
									}}>
									Edit
								</Button>
							</TableCell>
							<TableCell>
								<Button
									// onClick={() => {
									// 	props.modalHandler(row.id);
									// }}
									size="x-small"
									variant="outlined"
									color="secondary"
									style={{
										textTransform: 'none',
										maxWidth: '90px',
										maxHeight: '35px',
									}}>
									Delete
								</Button>
							</TableCell>							
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}
