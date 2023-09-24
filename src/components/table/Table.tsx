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

	Level0?: number, Level1?: number, Level2?: number, Level3?: number, Level4?: number, Level5?: number, Level6?: number, Level7?: number, Level8?: number, Level9?: number,
	Level10?: number, Level11?: number, Level12?: number, Level13?: number, Level14?: number, Level15?: number, Level16?: number, Level17?: number, Level18?: number, Level19?: number,
	Level20?: number, Level21?: number, Level22?: number, Level23?: number, Level24?: number, Level25?: number, Level26?: number, Level27?: number, Level28?: number, Level29?: number,
	Level30?: number, Level31?: number, Level32?: number, Level33?: number, Level34?: number, Level35?: number, Level36?: number, Level37?: number, Level38?: number, Level39?: number,
	Level40?: number, Level41?: number, Level42?: number, Level43?: number, Level44?: number, Level45?: number, Level46?: number, Level47?: number, Level48?: number, Level49?: number,
	Level50?: number, Level51?: number, Level52?: number, Level53?: number, Level54?: number, Level55?: number, Level56?: number, Level57?: number, Level58?: number, Level59?: number,
	Level60?: number, Level61?: number, Level62?: number, Level63?: number, Level64?: number, Level65?: number, Level66?: number, Level67?: number, Level68?: number, Level69?: number,
	Level70?: number, Level71?: number, Level72?: number, Level73?: number, Level74?: number, Level75?: number, Level76?: number, Level77?: number, Level78?: number, Level79?: number,
	Level80?: number, Level81?: number, Level82?: number, Level83?: number, Level84?: number, Level85?: number, Level86?: number, Level87?: number, Level88?: number, Level89?: number,
	Level90?: number, Level91?: number, Level92?: number, Level93?: number, Level94?: number, Level95?: number, Level96?: number, Level97?: number, Level98?: number, Level99?: number,
	Level100?: number
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
			let maxRowInfoKeyCount = -1;
			let maxRowInfoIndex = -1;
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

				const rowInfoKeyCount = Object.keys(rowInfo).length;
				if (rowInfoKeyCount > maxRowInfoKeyCount) {
					maxRowInfoIndex = rowInfos.length;
				}

				rowInfos.push(rowInfo);
			}

			// Populate rows
			const _rows: IRowInfo[] = rowInfos;
			SetRows(_rows);

			// Populate columns
			const _columns: GridColDef[] = [];
			const rowInfoKeys = Object.keys(rowInfos[maxRowInfoIndex]);
			for (let key of rowInfoKeys) {
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

		if (true) {
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
			const DEBUG_DATA = [{"PartitionKey":"0","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":7.13,"FirstCompletionTimeSeconds":7.13,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T06:17:31.8533203+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":7.99,"FirstCompletionTimeSeconds":7.99,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T06:17:31.8652683+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"Player_ANDREW-ASUS_14cc113631afa34b6aa11947cbaa019d2375fdf1","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":71.57,"FirstCompletionTimeSeconds":71.57,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:22:31.0962611+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":5.64,"FirstCompletionTimeSeconds":5.64,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T06:17:21.7554048+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Player_ANDREW-ASUS_14cc113631afa34b6aa11947cbaa019d2375fdf1","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-09-22T05:48:00.5166735+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Player_Andrew’s MacBook Air_84C0D352-53D7-5948-8E18-985A0FB59F7E","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-09-22T05:57:18.9675228+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-09-22T06:17:31.8782114+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":1.65,"FirstCompletionTimeSeconds":2.83,"StarCount":2,"AttemptCount":2,"CompletionCount":2,"Timestamp":"2023-09-22T06:17:01.1204958+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Player_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":4.61,"FirstCompletionTimeSeconds":10.38,"StarCount":2,"AttemptCount":5,"CompletionCount":2,"Timestamp":"2023-09-22T06:17:11.7560614+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Player_ANDREW-ASUS_14cc113631afa34b6aa11947cbaa019d2375fdf1","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":1.74,"FirstCompletionTimeSeconds":1.74,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:22:31.0604173+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Player_Andrew’s MacBook Air_84C0D352-53D7-5948-8E18-985A0FB59F7E","ApiVersion":1,"ClientVersion":0.29,"BestCompletionTimeSeconds":2.24,"FirstCompletionTimeSeconds":2.24,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T05:57:18.9555754+00:00","ETag":{}},{"PartitionKey":"48","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":237.99,"FirstCompletionTimeSeconds":237.99,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.4326695+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":4.11,"FirstCompletionTimeSeconds":4.11,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2514604+00:00","ETag":{}},{"PartitionKey":"7","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":86.69,"FirstCompletionTimeSeconds":86.69,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8980039+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":11.51,"FirstCompletionTimeSeconds":11.51,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2624133+00:00","ETag":{}},{"PartitionKey":"37","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":18.62,"FirstCompletionTimeSeconds":18.62,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2793384+00:00","ETag":{}},{"PartitionKey":"6","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":114.04,"FirstCompletionTimeSeconds":114.04,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8870521+00:00","ETag":{}},{"PartitionKey":"50","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":100.58,"FirstCompletionTimeSeconds":100.58,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.4585557+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":7.46,"FirstCompletionTimeSeconds":7.46,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2922815+00:00","ETag":{}},{"PartitionKey":"39","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":14.87,"FirstCompletionTimeSeconds":14.87,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.3032334+00:00","ETag":{}},{"PartitionKey":"4","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":19.96,"FirstCompletionTimeSeconds":19.96,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8512068+00:00","ETag":{}},{"PartitionKey":"40","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":43.89,"FirstCompletionTimeSeconds":43.89,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.3161782+00:00","ETag":{}},{"PartitionKey":"42","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":18.97,"FirstCompletionTimeSeconds":18.97,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.3400731+00:00","ETag":{}},{"PartitionKey":"5","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":39.99,"FirstCompletionTimeSeconds":39.99,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8671383+00:00","ETag":{}},{"PartitionKey":"49","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":222.51,"FirstCompletionTimeSeconds":222.51,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.4446165+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":5.49,"FirstCompletionTimeSeconds":5.49,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.3639692+00:00","ETag":{}},{"PartitionKey":"44","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":57.61,"FirstCompletionTimeSeconds":57.61,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.3759175+00:00","ETag":{}},{"PartitionKey":"45","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":23.18,"FirstCompletionTimeSeconds":23.18,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.389856+00:00","ETag":{}},{"PartitionKey":"46","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":42.77,"FirstCompletionTimeSeconds":42.77,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.4077773+00:00","ETag":{}},{"PartitionKey":"47","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":90.11,"FirstCompletionTimeSeconds":90.11,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.4217171+00:00","ETag":{}},{"PartitionKey":"41","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":12.04,"FirstCompletionTimeSeconds":12.04,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.3271292+00:00","ETag":{}},{"PartitionKey":"34","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":69.74,"FirstCompletionTimeSeconds":69.74,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2405086+00:00","ETag":{}},{"PartitionKey":"32","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":26.24,"FirstCompletionTimeSeconds":26.24,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2166127+00:00","ETag":{}},{"PartitionKey":"8","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":98.6,"FirstCompletionTimeSeconds":98.6,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.9089554+00:00","ETag":{}},{"PartitionKey":"0","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":4.35,"FirstCompletionTimeSeconds":4.35,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8073995+00:00","ETag":{}},{"PartitionKey":"1","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":24.52,"FirstCompletionTimeSeconds":24.52,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8183514+00:00","ETag":{}},{"PartitionKey":"10","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":202.74,"FirstCompletionTimeSeconds":202.74,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.9338465+00:00","ETag":{}},{"PartitionKey":"11","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":170.39,"FirstCompletionTimeSeconds":170.39,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.9567478+00:00","ETag":{}},{"PartitionKey":"12","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":190.5,"FirstCompletionTimeSeconds":190.5,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.968695+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":2.02,"FirstCompletionTimeSeconds":2.02,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.9816383+00:00","ETag":{}},{"PartitionKey":"14","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":7.4,"FirstCompletionTimeSeconds":7.4,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.99259+00:00","ETag":{}},{"PartitionKey":"15","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":5.39,"FirstCompletionTimeSeconds":5.39,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.0115083+00:00","ETag":{}},{"PartitionKey":"16","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":17.87,"FirstCompletionTimeSeconds":17.87,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.0264429+00:00","ETag":{}},{"PartitionKey":"17","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":25.5,"FirstCompletionTimeSeconds":25.5,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.038391+00:00","ETag":{}},{"PartitionKey":"18","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":56.82,"FirstCompletionTimeSeconds":56.82,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.0503392+00:00","ETag":{}},{"PartitionKey":"19","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":130.06,"FirstCompletionTimeSeconds":130.06,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.0612902+00:00","ETag":{}},{"PartitionKey":"33","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":113.7,"FirstCompletionTimeSeconds":113.7,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2275658+00:00","ETag":{}},{"PartitionKey":"2","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":14.32,"FirstCompletionTimeSeconds":14.32,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8293036+00:00","ETag":{}},{"PartitionKey":"21","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":37.78,"FirstCompletionTimeSeconds":37.78,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.0881725+00:00","ETag":{}},{"PartitionKey":"22","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":12.89,"FirstCompletionTimeSeconds":12.89,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1001215+00:00","ETag":{}},{"PartitionKey":"23","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":8.6,"FirstCompletionTimeSeconds":8.6,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1110734+00:00","ETag":{}},{"PartitionKey":"24","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":11.06,"FirstCompletionTimeSeconds":11.06,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1240168+00:00","ETag":{}},{"PartitionKey":"25","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":43.53,"FirstCompletionTimeSeconds":43.53,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1339736+00:00","ETag":{}},{"PartitionKey":"26","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":56.54,"FirstCompletionTimeSeconds":56.54,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1449255+00:00","ETag":{}},{"PartitionKey":"27","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":75.49,"FirstCompletionTimeSeconds":75.49,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1558769+00:00","ETag":{}},{"PartitionKey":"28","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":68.36,"FirstCompletionTimeSeconds":68.36,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1668299+00:00","ETag":{}},{"PartitionKey":"29","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":201.78,"FirstCompletionTimeSeconds":201.78,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.1787767+00:00","ETag":{}},{"PartitionKey":"3","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":89.48,"FirstCompletionTimeSeconds":89.48,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.8402557+00:00","ETag":{}},{"PartitionKey":"30","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":184.7,"FirstCompletionTimeSeconds":184.7,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.193712+00:00","ETag":{}},{"PartitionKey":"31","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":116.42,"FirstCompletionTimeSeconds":116.42,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.2046648+00:00","ETag":{}},{"PartitionKey":"20","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":28.0,"FirstCompletionTimeSeconds":28.0,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:27.0762258+00:00","ETag":{}},{"PartitionKey":"9","RowKey":"Shields_iPhone_F149148C-8F45-47FC-9F6E-555A9579ACED","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":226.23,"FirstCompletionTimeSeconds":226.23,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-09-22T21:32:26.9228951+00:00","ETag":{}}]
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
