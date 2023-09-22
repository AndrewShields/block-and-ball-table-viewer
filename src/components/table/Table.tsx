import React, { useEffect } from "react";
import "./Table.css";
import HttpClient from "../../api/HttpClient";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface ITableProps {
	//
}

interface IRowInfo {
	PlayerId: string,

	Version: string,

	Level13?: number,
	Level43?: number,
	Level38?: number,
	Level0?: number,
	Level36?: number,
	Level35?: number,
	Level39?: number,
	Level45?: number,

	Level15?: number,
	Level41?: number,
	Level42?: number,
	Level1?: number,
	Level37?: number,
	Level20?: number,
	Level16?: number,
	Level17?: number,
	Level2?: number,

	Level22?: number,
	Level32?: number,
	Level3?: number,
	Level4?: number,
	Level7?: number,

	Level23?: number,
	Level26?: number,
	Level6?: number,
	Level44?: number,
	Level40?: number,
	Level28?: number,
	Level25?: number,
	Level34?: number,
	Level18?: number,
	Level5?: number,

	Level24?: number,
	Level46?: number,
	Level19?: number,
	Level27?: number,
	Level8?: number,
	Level29?: number,
	Level33?: number,
	Level9?: number,
	Level21?: number,
	Level49?: number,
	Level48?: number,
	Level47?: number,
	Level50?: number,

	Level14?: number,
	Level31?: number,
	Level30?: number,
	Level11?: number,
	Level10?: number,
	Level12?: number
}

interface ILevelInfo {
	PartitionKey: string, // LevelId
	RowKey: string, // PlayerId

	ApiVersion: number,
	ClientVersion: number,

	BestCompletionTimeSeconds: number,
	FirstCompletionTimeSeconds: number,
	StarCount: number,
	AttemptCount: number,
	CompletionCount: number,

	Timestamp: string | null,
	ETag: {}
}

export const Table: React.FunctionComponent<ITableProps> = (props: ITableProps) => {
	const [rows, SetRows] = React.useState<IRowInfo[]>([]);
	const [columns, SetColumns] = React.useState<GridColDef[]>([]);

	useEffect(() => {
		function populateTable(rawLevelInfos: ILevelInfo[]) {
			// Combine data for each player
			const playerLevelInfosHash: { [id: string]: ILevelInfo[] } = {};

			for (const levelInfo of rawLevelInfos) {
				const playerId = levelInfo.RowKey;
				if (playerLevelInfosHash[playerId] === undefined) {
					playerLevelInfosHash[playerId] = [];
				}
				playerLevelInfosHash[playerId].push(levelInfo);
			}

			// Generate row infos
			const rowInfos: IRowInfo[] = [];
			const playerIds = Object.keys(playerLevelInfosHash);
			for (const playerId of playerIds) {
				const levelInfos = playerLevelInfosHash[playerId];
				const rowInfo: any = { // TODO Shields type IRowInfo
					PlayerId: playerId,
					Version: `${levelInfos[0].ApiVersion} / ${levelInfos[0].ClientVersion}`
				};

				for (const levelInfo of levelInfos) {
					const levelId = levelInfo.PartitionKey;
					rowInfo[`Level${levelId}`] = levelInfo.BestCompletionTimeSeconds;
				}

				rowInfos.push(rowInfo);
			}

			// Populate rows
			const _rows: IRowInfo[] = rowInfos;
			SetRows(_rows);

			// Populate columns
			const _columns: GridColDef[] = [];
			const keys = Object.keys(_rows[0]);
			for (let key of keys) {
				const columnDef: GridColDef = {
					field: key,
					headerName: key
				}

				if (key === "PlayerId") {
					columnDef.width = 250;
					columnDef.valueFormatter = (params) => {
						const split = params.value.split("_");
						if (split.length < 2) {
							return params.value;
						}
						return split.slice(0, 2).join("_");
					};
				} else if (key === "Version") {
					//
				} else if (key.startsWith("Level")) {
					columnDef.type = "number";
					columnDef.valueFormatter = (params) => {
						if (params.value === -1) {
							return "+"; // Unlocked but incomplete
						} else if (params.value === undefined) {
							return "-"; // Locked
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
				}

				// Moderate hack: use description to sort columns
				columnDef.description = getColumnIndex(key);

				_columns.push(columnDef);
			}

			_columns.sort((a, b) => parseInt(a.description!) - parseInt(b.description!));

			SetColumns(_columns);
		}

		function getColumnIndex(key: string): string {
			if (key === "PlayerId") {
				return "0";
			} else if (key === "Version") {
				return "1";
			}

			// Put levels in the same order as in-game
			let i = 0;
			const mapLevelKeyToOrderIndex: any = {
				"Level13": i++,
				"Level43": i++, // Baby pit EXPERIMENTAL ////////////////////
				"Level38": i++, // Baby V EXPERIMENTAL ////////////////////
				"Level0": i++, // Original
				"Level36": i++, // Booster
				"Level35": i++, // Baby volcano
				"Level39": i++, // Deep V EXPERIMENTAL ////////////////////
				"Level45": i++, // Zig zag summit EXPERIMENTAL ////////////////////

				"Level15": i++,
				"Level41": i++, // Slippery slope EXPERIMENTAL ////////////////////
				"Level42": i++, // Stairs and ramp EXPERIMENTAL ////////////////////
				"Level1": i++, // Zig zag
				"Level37": i++, // Left pit EXPERIMENTAL ////////////////////
				"Level20": i++, // Triangles
				"Level16": i++, // Volcano
				"Level17": i++, // Max launch
				"Level2": i++, // Up right, launch left

				"Level22": i++,
				"Level32": i++, // Chip it, spider
				"Level3": i++, // Chip it
				"Level4": i++, // Chip it, ledges
				"Level7": i++, // Spiral

				"Level23": i++,
				"Level26": i++, // Roll it, zig zag
				"Level6": i++, // Semicircle
				"Level44": i++, // Chip it, roll it, loss 2 EXPERIMENTAL ////////////////////
				"Level40": i++, // Chip it, roll it, loss EXPERIMENTAL ////////////////////
				"Level28": i++, // Roll it, chip it, triangles
				"Level25": i++, // Cross
				"Level34": i++, // Roll it, maze
				"Level18": i++, // Slide sniper
				"Level5": i++, // Roll it

				"Level24": i++,
				"Level46": i++, // Funnel EXPERIMENTAL ////////////////////
				"Level19": i++, // Slow layer drop
				"Level27": i++, // Elephant EXPERIMENTAL ////////////////////
				"Level8": i++, // Juggle it
				"Level29": i++, // Cross octagon
				"Level33": i++, // V
				"Level9": i++, // Juggle it, island
				"Level21": i++, // Slow drop sniper
				"Level49": i++, // Hook EXPERIMENTAL ////////////////////
				"Level48": i++, // Candle EXPERIMENTAL ////////////////////
				"Level47": i++, // Asteroids EXPERIMENTAL ////////////////////
				"Level50": i++, // Rune EXPERIMENTAL ////////////////////

				"Level14": i++,
				"Level31": i++, // Load it, roll it
				"Level30": i++, // Load and skip it EXPERIMENTAL ////////////////////
				"Level11": i++, // Stairs
				"Level10": i++, // Load it
				"Level12": i++, // Finale
			};

			// Must offset by known columns before this one
			const BASE_COLUMN_INDEX = 2;

			const mappedIndex = mapLevelKeyToOrderIndex[key];
			if (mappedIndex === undefined) {
				const levelIndex = parseInt(key.replace("Level", ""));
				return (BASE_COLUMN_INDEX + levelIndex).toString();
			}

			return (BASE_COLUMN_INDEX + mappedIndex).toString();
		}

		if (false) {
			// Get cloud data for all players
			new HttpClient().get({
				endpoint: "players/",
				token: null,
				params: null
			}).then((response: any) => {
				populateTable(response.data);
			}).catch((error) => {
				//
			});
		} else {
			// Debug
			const DEBUG_DATA = [{"PartitionKey":"0","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":7.13,"FirstCompletionTimeSeconds":7.13,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T06:17:31.8533203+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Player_ANDREW-ASUS_14cc113631afa34b6aa11947cbaa019d2375fdf1","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":2.21,"FirstCompletionTimeSeconds":2.21,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T05:48:00.5047259+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Player_Andrew’s MacBook Air_84C0D352-53D7-5948-8E18-985A0FB59F7E","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":2.24,"FirstCompletionTimeSeconds":2.24,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T05:57:18.9555754+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":1.65,"FirstCompletionTimeSeconds":2.83,"StarCount":2,"AttemptCount":2,"CompletionCount":2,"Timestamp":"2023-09-22T06:17:01.1204958+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-09-22T06:17:31.8782114+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":7.99,"FirstCompletionTimeSeconds":7.99,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T06:17:31.8652683+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":5.64,"FirstCompletionTimeSeconds":5.64,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T06:17:21.7554048+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Player_ANDREW-ASUS_14cc113631afa34b6aa11947cbaa019d2375fdf1","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-09-22T05:48:00.5166735+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Player_Andrew’s MacBook Air_84C0D352-53D7-5948-8E18-985A0FB59F7E","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-09-22T05:57:18.9675228+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":4.61,"FirstCompletionTimeSeconds":10.38,"StarCount":2,"AttemptCount":5,"CompletionCount":2,"Timestamp":"2023-09-22T06:17:11.7560614+00:00","ETag":{}}];
			populateTable(DEBUG_DATA);
		}
	}, []);

	return (
		<div style={{ display: "flex", justifyContent: "center", height: "100%", padding: "10px" }}>
			<Box sx={{ minWidth: "400px" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					getRowId={(row) => row.PlayerId} // Need unique row "id"
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
