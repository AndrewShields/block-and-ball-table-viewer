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
	ClientVersion: number,
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
				} else if (key === "ClientVersion") {
					columnDef.type = "number";
					columnDef.valueFormatter = (params) => {
						// 0.2 -> 0.20
						return `${params.value.toString().padEnd(4, "0")}`;
					};
				} else if (key === "RowKey") {
					columnDef.width = 500;
				} else if (key.startsWith("Level")) {
					columnDef.type = "number";
					columnDef.valueFormatter = (params) => {
						if (params.value === -1) {
							return "-";
						} else {
							const minutes = Math.floor(params.value / 60);
							const seconds = (params.value - (minutes * 60)).toFixed(2);

							if (minutes > 0) {
								// 00:00.00
								return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(5, "0")}`;
							}
							// 00.00
							return `${seconds}`;
						}
					};
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
			} else if (key === "ClientVersion") {
				return "1";
			} else if (key === "PartitionKey") {
				return "2";
			} else if (key === "RowKey") {
				return "3";
			} else if (key === "Timestamp") {
				return "55";
			}

			if (!key.startsWith("Level")) {
				console.error("Unexpected key: " + key);
				return "-1";
			}

			// Put levels in the same order as in-game
			const mapLevelKeyToOrderIndex: any = {
				Level13: 0, // DEMO_HIT_IT
				Level0: 1, // Original
				Level35: 2, // Baby volcano
				Level36: 3, // Gundam

				Level15: 4, // DEMO_FREE_IT
				Level1: 5, // Zig zag
				Level20: 6, // Triangles
				Level16: 7, // Volcano
				Level17: 8, // MaLevel launch
				Level2: 9, // Up right, launch left

				Level22: 10, // DEMO_CHIP_IT
				Level32: 11, // Chip it, spider
				Level3: 12, // Chip it
				Level4: 13, // Chip it, ledges
				Level7: 14, // Spiral

				Level23: 15, // DEMO_ROLL_IT
				Level26: 16, // Roll it, zig zag
				Level6: 17, // Semicircle
				Level28: 18, // Roll it, chip it, triangles
				Level25: 19, // Cross
				Level34: 20, // Roll it, maze
				Level18: 21, // Slide sniper
				Level5: 22, // Roll it

				Level24: 23, // DEMO_JUGGLE_IT
				Level19: 24, // Slow layer drop
				Level8: 25, // Juggle it
				Level29: 26, // Cross octagon
				Level33: 27, // V
				Level9: 28, // Juggle it, island
				Level21: 29, // Slow drop sniper

				Level14: 30, // DEMO_LOAD_IT
				Level30: 31, // Load and skip it
				Level31: 32, // Load it, roll it
				Level11: 33, // Stairs
				Level10: 34, // Load it
				Level12: 35, // Finale

				// Dead levels
				//Level27, // Minecraft ///////////////////// DEAD
			};

			// Must offset by known columns before this one
			const BASE_COLUMN_INDEX = 4;

			const mappedIndex = mapLevelKeyToOrderIndex[key];
			if (mappedIndex === undefined) {
				const levelIndex = parseInt(key.replace("Level", ""));
				return (BASE_COLUMN_INDEX + levelIndex).toString();
			}

			return (BASE_COLUMN_INDEX + mappedIndex).toString();
		}

		if (true) {
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
		} else {
			// Debug
			const DEBUG_DATA = [{"ApiVersion":1,"ClientVersion":0.20,"PartitionKey":"World0","RowKey":"4th_iPhone_70A19FC6-1265-44DD-9432-C46C7FC79C6E","Level0":1800.0,"Level1":1800.0,"Level2":1800.0,"Level3":241.73,"Level4":53.86,"Level5":1800.0,"Level6":923.36,"Level7":1800.0,"Level8":1800.0,"Level9":1800.0,"Level10":1800.0,"Level11":1800.0,"Level12":1800.0,"Level13":18.13,"Level14":1800.0,"Level15":1800.0,"Level16":1800.0,"Level17":1800.0,"Level18":1800.0,"Level19":1800.0,"Level20":1800.0,"Level21":1800.0,"Level22":20.66,"Level23":1800.0,"Level24":1800.0,"Level25":1800.0,"Level26":1800.0,"Level27":-1.0,"Level28":1800.0,"Level29":1800.0,"Level30":1800.0,"Level31":1800.0,"Level32":41.41,"Level33":1800.0,"Level34":1800.0,"Level35":-1.0,"Level36":-1.0,"Level37":-1.0,"Level38":-1.0,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":-1.0,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-07-02T18:08:50.3077486+00:00","ETag":{}},{"ApiVersion":1,"ClientVersion":0.19,"PartitionKey":"World0","RowKey":"Bal_iPhone_70A19FC6-1265-44DD-9432-C46C7FC79C6E","Level0":14.65,"Level1":30.8,"Level2":27.73,"Level3":-1.0,"Level4":-1.0,"Level5":-1.0,"Level6":-1.0,"Level7":-1.0,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":5.22,"Level14":-1.0,"Level15":32.74,"Level16":47.63,"Level17":80.72,"Level18":-1.0,"Level19":-1.0,"Level20":46.46,"Level21":-1.0,"Level22":-1.0,"Level23":-1.0,"Level24":-1.0,"Level25":-1.0,"Level26":-1.0,"Level27":-1.0,"Level28":-1.0,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":-1.0,"Level33":-1.0,"Level34":-1.0,"Level35":-1.0,"Level36":-1.0,"Level37":-1.0,"Level38":-1.0,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":-1.0,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-07-02T17:37:19.6239599+00:00","ETag":{}},{"ApiVersion":1,"ClientVersion":0.19,"PartitionKey":"World0","RowKey":"First 0.19_iPhone_70A19FC6-1265-44DD-9432-C46C7FC79C6E","Level0":7.84,"Level1":23.09,"Level2":21.83,"Level3":35.65,"Level4":55.7,"Level5":86.89,"Level6":84.25,"Level7":152.28,"Level8":95.31,"Level9":273.81,"Level10":370.54,"Level11":96.39,"Level12":202.64,"Level13":2.81,"Level14":10.25,"Level15":11.8,"Level16":25.3,"Level17":58.48,"Level18":50.4,"Level19":35.14,"Level20":34.97,"Level21":74.43,"Level22":5.51,"Level23":8.54,"Level24":16.65,"Level25":51.79,"Level26":62.72,"Level27":-1.0,"Level28":46.2,"Level29":46.5,"Level30":221.17,"Level31":149.92,"Level32":38.87,"Level33":65.17,"Level34":111.91,"Level35":-1.0,"Level36":-1.0,"Level37":-1.0,"Level38":-1.0,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":-1.0,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-06-30T16:53:12.0987106+00:00","ETag":{}}];
			populateTable(DEBUG_DATA);
		}
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
