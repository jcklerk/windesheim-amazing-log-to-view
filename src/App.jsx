import { Label, Table, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

export default function App() {
	let [grid, setGrid] = useState([]);
	let [tableHtml, setTableHtml] = useState([]);
	let x = 20;
	let y = 20;
	let renderGrid = (data) => {
		console.log(data);
		const regex = /\[(\d+),(\d+)\]/g;
		let match;
		const result = [];
		let countWhile = 0;
		// Loop through all matches and swap the x and y coordinates
		while ((match = regex.exec(data)) !== null) {
			const y = parseInt(match[1]);
			const x = parseInt(match[2]);

			if (typeof result[y] == "undefined") {
				result[y] = [];
			}
			if (typeof result[y][x] == "undefined") {
				result[y][x] = [];
			}

			// Swap x and y, and push as [y, x] to the result array
			result[y][x].push(countWhile);
			countWhile++;
		}

		setGrid(result);
		console.log(result);
	};
	useEffect(() => {
		let tableData = [];
		for (let i = 0; i < x; i++) {
			let cell = [];

			for (let j = 0; j < y; j++) {
				if (typeof grid[i] != "undefined") {
					if (typeof grid[i][j] != "undefined") {
						cell.push(
							<Table.Cell key={i + "." + j} className=" text-black">
								{JSON.stringify(grid[i][j])}
							</Table.Cell>
						);
						continue;
					} else {
						cell.push(
							<Table.Cell key={i + "." + j} className="text-gray-400">
								{i} | {j}
							</Table.Cell>
						);
					}
				} else {
					cell.push(
						<Table.Cell key={i + "." + j} className="text-gray-400">
							{i} | {j}
						</Table.Cell>
					);
				}
			}
			tableData.push(<Table.Row key={i}>{cell}</Table.Row>);
		}
		setTableHtml(tableData);
	}, [grid, x, y]);

	return (
		<>
			<div className="max-w-md">
				<div className="mb-2 block">
					<Label htmlFor="comment" value="Your log" />
				</div>
				<Textarea
					id="comment"
					placeholder="leave the log here"
					required
					onChange={(e) => renderGrid(e.target.value)}
					rows={4}
				/>
			</div>
			<div>
				<div className="overflow-x-auto">
					<Table>
						<Table.Body className="divide-y">{tableHtml}</Table.Body>
					</Table>
				</div>
			</div>
		</>
	);
}
