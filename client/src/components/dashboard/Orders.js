import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Button } from '@material-ui/core';

import Title from './Title';

export default function Orders(props) {
	return (
		<React.Fragment>
			<Title>Mails</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							<strong>Scheduled</strong>
						</TableCell>
						<TableCell>
							<strong>To</strong>
						</TableCell>
						<TableCell>
							<strong>Subject</strong>
						</TableCell>
						<TableCell>
							<strong>Analytics</strong>
						</TableCell>
						<TableCell>
							<strong>{props.column}</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.item.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.schedule}</TableCell>
							<TableCell>
								<Accordion>
									<AccordionSummary>{row.recipientSummary} ...</AccordionSummary>
									<AccordionDetails>
										<div>
											{row.recipient.map(recipent => (
												<li style={{ listStyleType: 'none' }}>
													{recipent}
												</li>
											))}
										</div>
									</AccordionDetails>
								</Accordion>
							</TableCell>
							<TableCell>{row.subject}</TableCell>

							<TableCell>
								<Button
									onClick={() => {
										props.modalHandler(row.id);
									}}
									size="x-small"
									variant="outlined"
									color="primary"
									style={{
										textTransform: 'none',
										maxWidth: '90px',
										maxHeight: '35px',
									}}>
									Analytics
								</Button>
							</TableCell>
							<TableCell>
								{props.children &&
									React.cloneElement(props.children, {
										onClick: props.childOperation.bind(null, row.id),
									})}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}
