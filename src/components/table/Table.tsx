import React, { useEffect } from "react";
import "./Table.css";
import HttpClient from "../../api/HttpClient";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface ITableProps {
	//
}

interface IWorldInfo {
	ApiVersion: number,
	PartitionKey: string,
	RowKey: string,
	Level0: number, Level1: number, Level2: number, Level3: number, Level4: number, Level5: number, Level6: number, Level7: number, Level8: number, Level9: number,
	Level10: number, Level11: number, Level12: number, Level13: number, Level14: number, Level15: number, Level16: number, Level17: number, Level18: number, Level19: number,
	Level20: number, Level21: number, Level22: number, Level23: number, Level24: number, Level25: number, Level26: number, Level27: number, Level28: number, Level29: number,
	Level30: number, Level31: number, Level32: number, Level33: number, Level34: number, Level35: number, Level36: number, Level37: number, Level38: number, Level39: number,
	Level40: number, Level41: number, Level42: number, Level43: number, Level44: number, Level45: number, Level46: number, Level47: number, Level48: number, Level49: number,
	Level50: number,
	Timestamp: string,
	ETag: {}
}

export const Table: React.FunctionComponent<ITableProps> = (props: ITableProps) => {
	const [rows, SetRows] = React.useState<any[]>([]);
	const [columns, SetColumns] = React.useState<GridColDef[]>([]);

	useEffect(() => {
		// Get cloud data for all players
		new HttpClient().get({
			endpoint: "players/",
			token: null,
			params: { worldId: "World0" }
		}).then((response: any) => {
			// Populate rows
			const _rows: IWorldInfo[] = response.data;
			SetRows(_rows);

			// Populate columns
			const _columns: GridColDef[] = [];
			const keys = Object.keys(_rows[0]);
			for (let key of keys) {
				const columnDef: GridColDef = {
					field: key,
					headerName: key
				}

				if (key === "ApiVersion") {
					columnDef.type = "number";
				} else if (key.startsWith("Level")) {
					columnDef.type = "number";
					columnDef.valueFormatter = (params) => params.value === -1 ? "-" : params.value.toString();
				} else if (key === "Timestamp") {
					columnDef.valueFormatter = (params) => params.value.split("T")[0];
				} else if (key === "ETag") {
					continue;
				}

				_columns.push(columnDef);
			}

			SetColumns(_columns);
		}).catch((error) => {
			//
		});
	}, []);

	return (
		<div style={{ display: "flex", justifyContent: "center", height: "100%", padding: "10px" }}>
			<Box sx={{ minWidth: "400px" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					getRowId={(row) => `${row.PartitionKey}::${row.RowKey}`} // Need unique row "id"
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 25,
							},
						},
					}}
					checkboxSelection
					disableRowSelectionOnClick
				/>
			</Box>
		</div>
	);
}
