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
	Timestamp: string | null,
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
					columnDef.valueFormatter = (params) => params.value?.split("T")[0];
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
			let i = 0;
			const mapLevelKeyToOrderIndex: any = {
				Level13: i++,
				Level43: i++, // Baby pit EXPERIMENTAL ////////////////////
				Level38: i++, // Baby V EXPERIMENTAL ////////////////////
				Level0: i++, // Original
				Level36: i++, // Booster
				Level35: i++, // Baby volcano
				Level39: i++, // Deep V EXPERIMENTAL ////////////////////
				Level45: i++, // Zig zag summit EXPERIMENTAL ////////////////////

				Level15: i++,
				Level41: i++, // Slippery slope EXPERIMENTAL ////////////////////
				Level42: i++, // Stairs and ramp EXPERIMENTAL ////////////////////
				Level1: i++, // Zig zag
				Level37: i++, // Left pit EXPERIMENTAL ////////////////////
				Level20: i++, // Triangles
				Level16: i++, // Volcano
				Level17: i++, // Max launch
				Level2: i++, // Up right, launch left

				Level22: i++,
				Level32: i++, // Chip it, spider
				Level3: i++, // Chip it
				Level4: i++, // Chip it, ledges
				Level7: i++, // Spiral

				Level23: i++,
				Level26: i++, // Roll it, zig zag
				Level6: i++, // Semicircle
				Level44: i++, // Chip it, roll it, loss 2 EXPERIMENTAL ////////////////////
				Level40: i++, // Chip it, roll it, loss EXPERIMENTAL ////////////////////
				Level28: i++, // Roll it, chip it, triangles
				Level25: i++, // Cross
				Level34: i++, // Roll it, maze
				Level18: i++, // Slide sniper
				Level5: i++, // Roll it

				Level24: i++,
				Level46: i++, // Funnel EXPERIMENTAL ////////////////////
				Level19: i++, // Slow layer drop
				Level27: i++, // Elephant EXPERIMENTAL ////////////////////
				Level8: i++, // Juggle it
				Level29: i++, // Cross octagon
				Level33: i++, // V
				Level9: i++, // Juggle it, island
				Level21: i++, // Slow drop sniper
				Level49: i++, // Hook EXPERIMENTAL ////////////////////
				Level48: i++, // Candle EXPERIMENTAL ////////////////////
				Level47: i++, // Asteroids EXPERIMENTAL ////////////////////
				Level50: i++, // Rune EXPERIMENTAL ////////////////////

				Level14: i++,
				Level31: i++, // Load it, roll it
				Level30: i++, // Load and skip it EXPERIMENTAL ////////////////////
				Level11: i++, // Stairs
				Level10: i++, // Load it
				Level12: i++, // Finale
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
			const DEBUG_DATA = [{"ApiVersion":0,"ClientVersion":9999.0,"PartitionKey":"","RowKey":"Median","Level0":10.11,"Level1":27.43,"Level2":21.83,"Level3":55.76,"Level4":27.52,"Level5":71.95,"Level6":137.44,"Level7":109.25,"Level8":141.46,"Level9":167.29,"Level10":224.66,"Level11":105.25,"Level12":296.0,"Level13":4.92,"Level14":12.77,"Level15":12.35,"Level16":20.02,"Level17":47.33,"Level18":52.1,"Level19":43.3,"Level20":43.64,"Level21":74.43,"Level22":8.22,"Level23":8.28,"Level24":14.28,"Level25":52.39,"Level26":63.5,"Level27":-1.0,"Level28":109.09,"Level29":104.25,"Level30":79.02,"Level31":149.92,"Level32":67.0,"Level33":65.17,"Level34":81.8,"Level35":12.59,"Level36":24.49,"Level37":31.85,"Level38":15.36,"Level39":32.75,"Level40":109.04,"Level41":14.54,"Level42":35.67,"Level43":10.38,"Level44":61.76,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":null,"ETag":{}},{"ApiVersion":1,"ClientVersion":0.27,"PartitionKey":"World0","RowKey":"ABitter_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","Level0":22.13,"Level1":-1.0,"Level2":-1.0,"Level3":-1.0,"Level4":-1.0,"Level5":-1.0,"Level6":-1.0,"Level7":-1.0,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":4.74,"Level14":-1.0,"Level15":-1.0,"Level16":-1.0,"Level17":-1.0,"Level18":-1.0,"Level19":-1.0,"Level20":-1.0,"Level21":-1.0,"Level22":-1.0,"Level23":-1.0,"Level24":-1.0,"Level25":-1.0,"Level26":-1.0,"Level27":-1.0,"Level28":-1.0,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":-1.0,"Level33":-1.0,"Level34":-1.0,"Level35":-1.0,"Level36":9.94,"Level37":-1.0,"Level38":10.98,"Level39":-1.0,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":10.59,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-09-10T03:55:54.1368861+00:00","ETag":{}},{"ApiVersion":1,"ClientVersion":0.27,"PartitionKey":"World0","RowKey":"DBitter_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","Level0":12.84,"Level1":-1.0,"Level2":-1.0,"Level3":-1.0,"Level4":-1.0,"Level5":-1.0,"Level6":-1.0,"Level7":-1.0,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":6.66,"Level14":-1.0,"Level15":18.07,"Level16":-1.0,"Level17":-1.0,"Level18":-1.0,"Level19":-1.0,"Level20":-1.0,"Level21":-1.0,"Level22":-1.0,"Level23":-1.0,"Level24":-1.0,"Level25":-1.0,"Level26":-1.0,"Level27":-1.0,"Level28":-1.0,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":-1.0,"Level33":-1.0,"Level34":-1.0,"Level35":8.14,"Level36":49.17,"Level37":-1.0,"Level38":9.77,"Level39":46.08,"Level40":-1.0,"Level41":-1.0,"Level42":-1.0,"Level43":6.81,"Level44":-1.0,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-09-10T03:53:50.4010452+00:00","ETag":{}},{"ApiVersion":1,"ClientVersion":0.25,"PartitionKey":"World0","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","Level0":7.72,"Level1":24.09,"Level2":10.9,"Level3":75.86,"Level4":12.85,"Level5":-1.0,"Level6":203.68,"Level7":112.89,"Level8":-1.0,"Level9":-1.0,"Level10":-1.0,"Level11":-1.0,"Level12":-1.0,"Level13":2.72,"Level14":-1.0,"Level15":9.23,"Level16":14.93,"Level17":33.93,"Level18":42.34,"Level19":-1.0,"Level20":21.5,"Level21":-1.0,"Level22":10.93,"Level23":8.0,"Level24":-1.0,"Level25":52.99,"Level26":68.22,"Level27":-1.0,"Level28":142.89,"Level29":-1.0,"Level30":-1.0,"Level31":-1.0,"Level32":42.92,"Level33":-1.0,"Level34":59.01,"Level35":3.68,"Level36":8.03,"Level37":8.38,"Level38":5.69,"Level39":4.25,"Level40":46.75,"Level41":18.05,"Level42":19.39,"Level43":6.07,"Level44":61.76,"Level45":-1.0,"Level46":-1.0,"Level47":-1.0,"Level48":-1.0,"Level49":-1.0,"Level50":-1.0,"Timestamp":"2023-09-02T00:44:03.5757588+00:00","ETag":{}}];
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
