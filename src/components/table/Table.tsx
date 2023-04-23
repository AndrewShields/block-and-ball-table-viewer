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
		function populateTable(data: IWorldInfo[]) {
			// Populate rows
			const _rows: IWorldInfo[] = data;
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

				// Moderate hack: use description to sort columns
				columnDef.description = getColumnIndex(key);

				_columns.push(columnDef);
			}

			_columns.sort((a, b) => parseInt(a.description!) - parseInt(b.description!));

			SetColumns(_columns);
		}

		function getColumnIndex(key: string): string {
			if (key === "ApiVersion") {
				return "0";
			} else if (key === "PartitionKey") {
				return "1";
			} else if (key === "RowKey") {
				return "2";
			} else if (key === "Timestamp") {
				return "54";
			}

			if (!key.startsWith("Level")) {
				console.error("Unexpected key: " + key);
				return "-1";
			}

			// Put levels in the same order as in-game
			const mapLevelKeyToOrderIndex: any = {
				Level13: 0, // DEMO_HIT_IT
				Level0: 1, // Original

				Level15: 2, // DEMO_FREE_IT
				Level1: 3, // Zig zag
				Level20: 4, // Triangles
				Level2: 5, // Up right, launch left
				Level16: 6, // Volcano
				Level17: 7, // Max launch
				Level19: 8, // Slow layer drop

				Level22: 9, // DEMO_CHIP_IT
				Level32: 10, // Chip it, spider
				Level3: 11, // Chip it
				Level6: 12, // Semicircle
				Level4: 13, // Chip it, ledges
				Level7: 14, // Spiral

				Level23: 15, // DEMO_ROLL_IT
				Level28: 16, // Roll it, chip it, triangles
				Level26: 17, // Roll it, zig zag
				Level25: 18, // Cross
				Level34: 19, // Roll it, maze
				Level5: 20, // Roll it
				Level18: 21, // Slide sniper

				Level24: 22, // DEMO_JUGGLE_IT
				Level8: 23, // Juggle it
				Level29: 24, // Cross octagon
				Level33: 25, // V
				Level9: 26, // Juggle it, island
				Level21: 27, // Slow drop sniper

				Level14: 28, // DEMO_LOAD_IT
				Level30: 29, // Load and skip it
				Level31: 30, // Load it, roll it
				Level11: 31, // Stairs
				Level10: 32, // Load it
				Level12: 33, // Finale

				// Dead levels
				Level27: 34, // Minecraft ///////////////////// DEAD
			};

			// Must offset by known columns before this one
			const BASE_COLUMN_INDEX = 3;

			const mappedIndex = mapLevelKeyToOrderIndex[key];
			if (mappedIndex === undefined) {
				const levelIndex = parseInt(key.replace("Level", ""));
				return (BASE_COLUMN_INDEX + levelIndex).toString();
			}

			return (BASE_COLUMN_INDEX + mappedIndex).toString();
		}

		// Get cloud data for all players
		new HttpClient().get({
			endpoint: "players/",
			token: null,
			params: { worldId: "World0" }
		}).then((response: any) => {
			populateTable(response.data);
		}).catch((error) => {
			//
		});

		// Debug
		//const DEBUG_DATA = [{"ApiVersion":777,"PartitionKey":"World0_LOCAL","RowKey":"Player0","Level0":6.0,"Level1":48.94,"Level2":22.72,"Level3":-1.0,"Level4":-1.0,"Level5":-1.0,"Level6":-1.0,"Level7":-1.0,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":2.91,"Level14":-1.0,"Level15":7.76,"Level16":123.47,"Level17":-1.0,"Level18":-1.0,"Level19":-1.0,"Level20":51.47,"Level21":-1.0,"Level22":-1.0,"Level23":-1.0,"Level24":-1.0,"Level25":-1.0,"Level26":-1.0,"Level27":-1.0,"Level28":-1.0,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":-1.0,"Level33":-1.0,"Level34":-1.0,"Level35":-1.0,"Level36":-1.0,"Level37":-1.0,"Level38":-1.0,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":-1.0,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-04-23T22:40:50.542146+00:00","ETag":{}},{"ApiVersion":777,"PartitionKey":"World0_LOCAL","RowKey":"Player1","Level0":6.0,"Level1":-1.0,"Level2":-1.0,"Level3":-1.0,"Level4":-1.0,"Level5":-1.0,"Level6":-1.0,"Level7":-1.0,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":2.91,"Level14":-1.0,"Level15":-1.0,"Level16":-1.0,"Level17":-1.0,"Level18":-1.0,"Level19":-1.0,"Level20":-1.0,"Level21":-1.0,"Level22":-1.0,"Level23":-1.0,"Level24":-1.0,"Level25":-1.0,"Level26":-1.0,"Level27":-1.0,"Level28":-1.0,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":-1.0,"Level33":-1.0,"Level34":-1.0,"Level35":-1.0,"Level36":-1.0,"Level37":-1.0,"Level38":-1.0,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":-1.0,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-04-09T05:13:45.1953457+00:00","ETag":{}},{"ApiVersion":777,"PartitionKey":"World0_LOCAL","RowKey":"Player2","Level0":10.0,"Level1":20.0,"Level2":-1.0,"Level3":-1.0,"Level4":-1.0,"Level5":-1.0,"Level6":-1.0,"Level7":-1.0,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":-1.0,"Level14":-1.0,"Level15":-1.0,"Level16":-1.0,"Level17":-1.0,"Level18":-1.0,"Level19":-1.0,"Level20":-1.0,"Level21":-1.0,"Level22":-1.0,"Level23":-1.0,"Level24":-1.0,"Level25":-1.0,"Level26":-1.0,"Level27":-1.0,"Level28":-1.0,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":-1.0,"Level33":-1.0,"Level34":-1.0,"Level35":-1.0,"Level36":-1.0,"Level37":-1.0,"Level38":-1.0,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":-1.0,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-04-12T04:15:06.2952077+00:00","ETag":{}}];
		//populateTable(DEBUG_DATA);
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
