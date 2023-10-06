import React, { useEffect } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import HttpClient from "../../api/HttpClient";
import "./Table.css";


export interface ITableProps {
	//
}

interface IRowInfo {
	PlayerId: string,

	Version: string,

	L0_BestTime?: number, L0_FirstTime?: number, L0_Stars?: number, L0_Attempts?: number, L0_Completions?: number,
	L1_BestTime?: number, L1_FirstTime?: number, L1_Stars?: number, L1_Attempts?: number, L1_Completions?: number,
	L2_BestTime?: number, L2_FirstTime?: number, L2_Stars?: number, L2_Attempts?: number, L2_Completions?: number,
	L3_BestTime?: number, L3_FirstTime?: number, L3_Stars?: number, L3_Attempts?: number, L3_Completions?: number,
	L4_BestTime?: number, L4_FirstTime?: number, L4_Stars?: number, L4_Attempts?: number, L4_Completions?: number,
	L5_BestTime?: number, L5_FirstTime?: number, L5_Stars?: number, L5_Attempts?: number, L5_Completions?: number,
	L6_BestTime?: number, L6_FirstTime?: number, L6_Stars?: number, L6_Attempts?: number, L6_Completions?: number,
	L7_BestTime?: number, L7_FirstTime?: number, L7_Stars?: number, L7_Attempts?: number, L7_Completions?: number,
	L8_BestTime?: number, L8_FirstTime?: number, L8_Stars?: number, L8_Attempts?: number, L8_Completions?: number,
	L9_BestTime?: number, L9_FirstTime?: number, L9_Stars?: number, L9_Attempts?: number, L9_Completions?: number,
	L10_BestTime?: number, L10_FirstTime?: number, L10_Stars?: number, L10_Attempts?: number, L10_Completions?: number,
	L11_BestTime?: number, L11_FirstTime?: number, L11_Stars?: number, L11_Attempts?: number, L11_Completions?: number,
	L12_BestTime?: number, L12_FirstTime?: number, L12_Stars?: number, L12_Attempts?: number, L12_Completions?: number,
	L13_BestTime?: number, L13_FirstTime?: number, L13_Stars?: number, L13_Attempts?: number, L13_Completions?: number,
	L14_BestTime?: number, L14_FirstTime?: number, L14_Stars?: number, L14_Attempts?: number, L14_Completions?: number,
	L15_BestTime?: number, L15_FirstTime?: number, L15_Stars?: number, L15_Attempts?: number, L15_Completions?: number,
	L16_BestTime?: number, L16_FirstTime?: number, L16_Stars?: number, L16_Attempts?: number, L16_Completions?: number,
	L17_BestTime?: number, L17_FirstTime?: number, L17_Stars?: number, L17_Attempts?: number, L17_Completions?: number,
	L18_BestTime?: number, L18_FirstTime?: number, L18_Stars?: number, L18_Attempts?: number, L18_Completions?: number,
	L19_BestTime?: number, L19_FirstTime?: number, L19_Stars?: number, L19_Attempts?: number, L19_Completions?: number,
	L20_BestTime?: number, L20_FirstTime?: number, L20_Stars?: number, L20_Attempts?: number, L20_Completions?: number,
	L21_BestTime?: number, L21_FirstTime?: number, L21_Stars?: number, L21_Attempts?: number, L21_Completions?: number,
	L22_BestTime?: number, L22_FirstTime?: number, L22_Stars?: number, L22_Attempts?: number, L22_Completions?: number,
	L23_BestTime?: number, L23_FirstTime?: number, L23_Stars?: number, L23_Attempts?: number, L23_Completions?: number,
	L24_BestTime?: number, L24_FirstTime?: number, L24_Stars?: number, L24_Attempts?: number, L24_Completions?: number,
	L25_BestTime?: number, L25_FirstTime?: number, L25_Stars?: number, L25_Attempts?: number, L25_Completions?: number,
	L26_BestTime?: number, L26_FirstTime?: number, L26_Stars?: number, L26_Attempts?: number, L26_Completions?: number,
	L27_BestTime?: number, L27_FirstTime?: number, L27_Stars?: number, L27_Attempts?: number, L27_Completions?: number,
	L28_BestTime?: number, L28_FirstTime?: number, L28_Stars?: number, L28_Attempts?: number, L28_Completions?: number,
	L29_BestTime?: number, L29_FirstTime?: number, L29_Stars?: number, L29_Attempts?: number, L29_Completions?: number,
	L30_BestTime?: number, L30_FirstTime?: number, L30_Stars?: number, L30_Attempts?: number, L30_Completions?: number,
	L31_BestTime?: number, L31_FirstTime?: number, L31_Stars?: number, L31_Attempts?: number, L31_Completions?: number,
	L32_BestTime?: number, L32_FirstTime?: number, L32_Stars?: number, L32_Attempts?: number, L32_Completions?: number,
	L33_BestTime?: number, L33_FirstTime?: number, L33_Stars?: number, L33_Attempts?: number, L33_Completions?: number,
	L34_BestTime?: number, L34_FirstTime?: number, L34_Stars?: number, L34_Attempts?: number, L34_Completions?: number,
	L35_BestTime?: number, L35_FirstTime?: number, L35_Stars?: number, L35_Attempts?: number, L35_Completions?: number,
	L36_BestTime?: number, L36_FirstTime?: number, L36_Stars?: number, L36_Attempts?: number, L36_Completions?: number,
	L37_BestTime?: number, L37_FirstTime?: number, L37_Stars?: number, L37_Attempts?: number, L37_Completions?: number,
	L38_BestTime?: number, L38_FirstTime?: number, L38_Stars?: number, L38_Attempts?: number, L38_Completions?: number,
	L39_BestTime?: number, L39_FirstTime?: number, L39_Stars?: number, L39_Attempts?: number, L39_Completions?: number,
	L40_BestTime?: number, L40_FirstTime?: number, L40_Stars?: number, L40_Attempts?: number, L40_Completions?: number,
	L41_BestTime?: number, L41_FirstTime?: number, L41_Stars?: number, L41_Attempts?: number, L41_Completions?: number,
	L42_BestTime?: number, L42_FirstTime?: number, L42_Stars?: number, L42_Attempts?: number, L42_Completions?: number,
	L43_BestTime?: number, L43_FirstTime?: number, L43_Stars?: number, L43_Attempts?: number, L43_Completions?: number,
	L44_BestTime?: number, L44_FirstTime?: number, L44_Stars?: number, L44_Attempts?: number, L44_Completions?: number,
	L45_BestTime?: number, L45_FirstTime?: number, L45_Stars?: number, L45_Attempts?: number, L45_Completions?: number,
	L46_BestTime?: number, L46_FirstTime?: number, L46_Stars?: number, L46_Attempts?: number, L46_Completions?: number,
	L47_BestTime?: number, L47_FirstTime?: number, L47_Stars?: number, L47_Attempts?: number, L47_Completions?: number,
	L48_BestTime?: number, L48_FirstTime?: number, L48_Stars?: number, L48_Attempts?: number, L48_Completions?: number,
	L49_BestTime?: number, L49_FirstTime?: number, L49_Stars?: number, L49_Attempts?: number, L49_Completions?: number,
	L50_BestTime?: number, L50_FirstTime?: number, L50_Stars?: number, L50_Attempts?: number, L50_Completions?: number,
	L51_BestTime?: number, L51_FirstTime?: number, L51_Stars?: number, L51_Attempts?: number, L51_Completions?: number,
	L52_BestTime?: number, L52_FirstTime?: number, L52_Stars?: number, L52_Attempts?: number, L52_Completions?: number,
	L53_BestTime?: number, L53_FirstTime?: number, L53_Stars?: number, L53_Attempts?: number, L53_Completions?: number,
	L54_BestTime?: number, L54_FirstTime?: number, L54_Stars?: number, L54_Attempts?: number, L54_Completions?: number,
	L55_BestTime?: number, L55_FirstTime?: number, L55_Stars?: number, L55_Attempts?: number, L55_Completions?: number,
	L56_BestTime?: number, L56_FirstTime?: number, L56_Stars?: number, L56_Attempts?: number, L56_Completions?: number,
	L57_BestTime?: number, L57_FirstTime?: number, L57_Stars?: number, L57_Attempts?: number, L57_Completions?: number,
	L58_BestTime?: number, L58_FirstTime?: number, L58_Stars?: number, L58_Attempts?: number, L58_Completions?: number,
	L59_BestTime?: number, L59_FirstTime?: number, L59_Stars?: number, L59_Attempts?: number, L59_Completions?: number,
	L60_BestTime?: number, L60_FirstTime?: number, L60_Stars?: number, L60_Attempts?: number, L60_Completions?: number,
	L61_BestTime?: number, L61_FirstTime?: number, L61_Stars?: number, L61_Attempts?: number, L61_Completions?: number,
	L62_BestTime?: number, L62_FirstTime?: number, L62_Stars?: number, L62_Attempts?: number, L62_Completions?: number,
	L63_BestTime?: number, L63_FirstTime?: number, L63_Stars?: number, L63_Attempts?: number, L63_Completions?: number,
	L64_BestTime?: number, L64_FirstTime?: number, L64_Stars?: number, L64_Attempts?: number, L64_Completions?: number,
	L65_BestTime?: number, L65_FirstTime?: number, L65_Stars?: number, L65_Attempts?: number, L65_Completions?: number,
	L66_BestTime?: number, L66_FirstTime?: number, L66_Stars?: number, L66_Attempts?: number, L66_Completions?: number,
	L67_BestTime?: number, L67_FirstTime?: number, L67_Stars?: number, L67_Attempts?: number, L67_Completions?: number,
	L68_BestTime?: number, L68_FirstTime?: number, L68_Stars?: number, L68_Attempts?: number, L68_Completions?: number,
	L69_BestTime?: number, L69_FirstTime?: number, L69_Stars?: number, L69_Attempts?: number, L69_Completions?: number,
	L70_BestTime?: number, L70_FirstTime?: number, L70_Stars?: number, L70_Attempts?: number, L70_Completions?: number,
	L71_BestTime?: number, L71_FirstTime?: number, L71_Stars?: number, L71_Attempts?: number, L71_Completions?: number,
	L72_BestTime?: number, L72_FirstTime?: number, L72_Stars?: number, L72_Attempts?: number, L72_Completions?: number,
	L73_BestTime?: number, L73_FirstTime?: number, L73_Stars?: number, L73_Attempts?: number, L73_Completions?: number,
	L74_BestTime?: number, L74_FirstTime?: number, L74_Stars?: number, L74_Attempts?: number, L74_Completions?: number,
	L75_BestTime?: number, L75_FirstTime?: number, L75_Stars?: number, L75_Attempts?: number, L75_Completions?: number,
	L76_BestTime?: number, L76_FirstTime?: number, L76_Stars?: number, L76_Attempts?: number, L76_Completions?: number,
	L77_BestTime?: number, L77_FirstTime?: number, L77_Stars?: number, L77_Attempts?: number, L77_Completions?: number,
	L78_BestTime?: number, L78_FirstTime?: number, L78_Stars?: number, L78_Attempts?: number, L78_Completions?: number,
	L79_BestTime?: number, L79_FirstTime?: number, L79_Stars?: number, L79_Attempts?: number, L79_Completions?: number,
	L80_BestTime?: number, L80_FirstTime?: number, L80_Stars?: number, L80_Attempts?: number, L80_Completions?: number,
	L81_BestTime?: number, L81_FirstTime?: number, L81_Stars?: number, L81_Attempts?: number, L81_Completions?: number,
	L82_BestTime?: number, L82_FirstTime?: number, L82_Stars?: number, L82_Attempts?: number, L82_Completions?: number,
	L83_BestTime?: number, L83_FirstTime?: number, L83_Stars?: number, L83_Attempts?: number, L83_Completions?: number,
	L84_BestTime?: number, L84_FirstTime?: number, L84_Stars?: number, L84_Attempts?: number, L84_Completions?: number,
	L85_BestTime?: number, L85_FirstTime?: number, L85_Stars?: number, L85_Attempts?: number, L85_Completions?: number,
	L86_BestTime?: number, L86_FirstTime?: number, L86_Stars?: number, L86_Attempts?: number, L86_Completions?: number,
	L87_BestTime?: number, L87_FirstTime?: number, L87_Stars?: number, L87_Attempts?: number, L87_Completions?: number,
	L88_BestTime?: number, L88_FirstTime?: number, L88_Stars?: number, L88_Attempts?: number, L88_Completions?: number,
	L89_BestTime?: number, L89_FirstTime?: number, L89_Stars?: number, L89_Attempts?: number, L89_Completions?: number,
	L90_BestTime?: number, L90_FirstTime?: number, L90_Stars?: number, L90_Attempts?: number, L90_Completions?: number,
	L91_BestTime?: number, L91_FirstTime?: number, L91_Stars?: number, L91_Attempts?: number, L91_Completions?: number,
	L92_BestTime?: number, L92_FirstTime?: number, L92_Stars?: number, L92_Attempts?: number, L92_Completions?: number,
	L93_BestTime?: number, L93_FirstTime?: number, L93_Stars?: number, L93_Attempts?: number, L93_Completions?: number,
	L94_BestTime?: number, L94_FirstTime?: number, L94_Stars?: number, L94_Attempts?: number, L94_Completions?: number,
	L95_BestTime?: number, L95_FirstTime?: number, L95_Stars?: number, L95_Attempts?: number, L95_Completions?: number,
	L96_BestTime?: number, L96_FirstTime?: number, L96_Stars?: number, L96_Attempts?: number, L96_Completions?: number,
	L97_BestTime?: number, L97_FirstTime?: number, L97_Stars?: number, L97_Attempts?: number, L97_Completions?: number,
	L98_BestTime?: number, L98_FirstTime?: number, L98_Stars?: number, L98_Attempts?: number, L98_Completions?: number,
	L99_BestTime?: number, L99_FirstTime?: number, L99_Stars?: number, L99_Attempts?: number, L99_Completions?: number,
	L100_BestTime?: number, L100_FirstTime?: number, L100_Stars?: number, L100_Attempts?: number, L100_Completions?: number
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
	const [showBestTime, setShowBestTime] = React.useState<boolean>(true);
	const [showFirstTime, setShowFirstTime] = React.useState<boolean>(false);
	const [showStars, setShowStars] = React.useState<boolean>(false);
	const [showAttempts, setShowAttempts] = React.useState<boolean>(false);
	const [showCompletions, setShowCompletions] = React.useState<boolean>(false);

	const [rows, setRows] = React.useState<IRowInfo[]>([]);
	const [columns, setColumns] = React.useState<GridColDef[]>([]);

	const [rawLevelInfos, setRawLevelInfos] = React.useState<ILevelInfo[]>();
	const [medianRowInfo, setMedianRowInfo] = React.useState<IRowInfo>();

	useEffect(() => {
		if (true) {
			// Get cloud data for all players
			new HttpClient().get({
				endpoint: "players/",
				token: null,
				params: null
			}).then((response: any) => {
				setRawLevelInfos(response.data);
			}).catch((error) => {
				//
			});
		} else {
			// Debug
			const DEBUG_DATA = [{"PartitionKey":"0","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":5.46,"FirstCompletionTimeSeconds":5.46,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.4416153+00:00","ETag":{}},{"PartitionKey":"1","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":33.52,"FirstCompletionTimeSeconds":33.52,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.4515721+00:00","ETag":{}},{"PartitionKey":"10","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":285.01,"FirstCompletionTimeSeconds":285.01,"StarCount":1,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.4625243+00:00","ETag":{}},{"PartitionKey":"11","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":232.69,"FirstCompletionTimeSeconds":232.69,"StarCount":1,"AttemptCount":3,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.4724806+00:00","ETag":{}},{"PartitionKey":"12","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":172.35,"FirstCompletionTimeSeconds":172.35,"StarCount":1,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.483433+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":2.42,"FirstCompletionTimeSeconds":2.42,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.4943851+00:00","ETag":{}},{"PartitionKey":"14","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":13.44,"FirstCompletionTimeSeconds":13.44,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5053371+00:00","ETag":{}},{"PartitionKey":"15","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":5.96,"FirstCompletionTimeSeconds":5.96,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5162893+00:00","ETag":{}},{"PartitionKey":"16","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":28.21,"FirstCompletionTimeSeconds":28.21,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5272415+00:00","ETag":{}},{"PartitionKey":"17","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":19.41,"FirstCompletionTimeSeconds":19.41,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5391894+00:00","ETag":{}},{"PartitionKey":"18","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":37.98,"FirstCompletionTimeSeconds":37.98,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5491458+00:00","ETag":{}},{"PartitionKey":"19","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":57.78,"FirstCompletionTimeSeconds":57.78,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5600979+00:00","ETag":{}},{"PartitionKey":"2","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":29.82,"FirstCompletionTimeSeconds":29.82,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.570055+00:00","ETag":{}},{"PartitionKey":"20","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":20.05,"FirstCompletionTimeSeconds":20.05,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5810068+00:00","ETag":{}},{"PartitionKey":"21","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":91.89,"FirstCompletionTimeSeconds":91.89,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.5899679+00:00","ETag":{}},{"PartitionKey":"22","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":8.43,"FirstCompletionTimeSeconds":8.43,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.6009202+00:00","ETag":{}},{"PartitionKey":"23","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":7.42,"FirstCompletionTimeSeconds":7.42,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.6118725+00:00","ETag":{}},{"PartitionKey":"24","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":0,"CompletionCount":0,"Timestamp":"2023-10-05T04:38:57.6218288+00:00","ETag":{}},{"PartitionKey":"25","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":36.42,"FirstCompletionTimeSeconds":36.42,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.632781+00:00","ETag":{}},{"PartitionKey":"26","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":74.36,"FirstCompletionTimeSeconds":74.36,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.6447284+00:00","ETag":{}},{"PartitionKey":"27","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":112.83,"FirstCompletionTimeSeconds":112.83,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.6546852+00:00","ETag":{}},{"PartitionKey":"28","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":52.69,"FirstCompletionTimeSeconds":52.69,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.6656374+00:00","ETag":{}},{"PartitionKey":"29","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":102.39,"FirstCompletionTimeSeconds":102.39,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.679576+00:00","ETag":{}},{"PartitionKey":"3","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":39.11,"FirstCompletionTimeSeconds":39.11,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.6905287+00:00","ETag":{}},{"PartitionKey":"30","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":134.74,"FirstCompletionTimeSeconds":134.74,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.701481+00:00","ETag":{}},{"PartitionKey":"31","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":97.06,"FirstCompletionTimeSeconds":97.06,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7124327+00:00","ETag":{}},{"PartitionKey":"32","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":28.75,"FirstCompletionTimeSeconds":28.75,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7233847+00:00","ETag":{}},{"PartitionKey":"33","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":198.37,"FirstCompletionTimeSeconds":198.37,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7343374+00:00","ETag":{}},{"PartitionKey":"34","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":84.79,"FirstCompletionTimeSeconds":84.79,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7452898+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":4.26,"FirstCompletionTimeSeconds":4.26,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7562415+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":15.14,"FirstCompletionTimeSeconds":15.14,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7671937+00:00","ETag":{}},{"PartitionKey":"37","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":21.55,"FirstCompletionTimeSeconds":21.55,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7781452+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":8.15,"FirstCompletionTimeSeconds":8.15,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.7890985+00:00","ETag":{}},{"PartitionKey":"39","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":5.41,"FirstCompletionTimeSeconds":5.41,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8010458+00:00","ETag":{}},{"PartitionKey":"4","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":25.11,"FirstCompletionTimeSeconds":25.11,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.811998+00:00","ETag":{}},{"PartitionKey":"40","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":118.57,"FirstCompletionTimeSeconds":118.57,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8219543+00:00","ETag":{}},{"PartitionKey":"41","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":9.11,"FirstCompletionTimeSeconds":9.11,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8329064+00:00","ETag":{}},{"PartitionKey":"42","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":24.3,"FirstCompletionTimeSeconds":24.3,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8438596+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":4.47,"FirstCompletionTimeSeconds":4.47,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8577995+00:00","ETag":{}},{"PartitionKey":"44","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":29.09,"FirstCompletionTimeSeconds":29.09,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8677549+00:00","ETag":{}},{"PartitionKey":"45","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":17.24,"FirstCompletionTimeSeconds":17.24,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8797016+00:00","ETag":{}},{"PartitionKey":"46","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":27.59,"FirstCompletionTimeSeconds":27.59,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.8906544+00:00","ETag":{}},{"PartitionKey":"47","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":278.22,"FirstCompletionTimeSeconds":278.22,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9016069+00:00","ETag":{}},{"PartitionKey":"48","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":171.7,"FirstCompletionTimeSeconds":171.7,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9125587+00:00","ETag":{}},{"PartitionKey":"49","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":205.01,"FirstCompletionTimeSeconds":205.01,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.924506+00:00","ETag":{}},{"PartitionKey":"5","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":58.97,"FirstCompletionTimeSeconds":58.97,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9364544+00:00","ETag":{}},{"PartitionKey":"50","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":813.8,"FirstCompletionTimeSeconds":813.8,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9474064+00:00","ETag":{}},{"PartitionKey":"6","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":94.85,"FirstCompletionTimeSeconds":94.85,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9583585+00:00","ETag":{}},{"PartitionKey":"7","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":48.76,"FirstCompletionTimeSeconds":48.76,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9742892+00:00","ETag":{}},{"PartitionKey":"8","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":160.03,"FirstCompletionTimeSeconds":160.03,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9852413+00:00","ETag":{}},{"PartitionKey":"9","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":49.87,"FirstCompletionTimeSeconds":49.87,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:38:57.9961932+00:00","ETag":{}},{"PartitionKey":"0","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":5.27,"FirstCompletionTimeSeconds":5.27,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.1644218+00:00","ETag":{}},{"PartitionKey":"1","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":26.09,"FirstCompletionTimeSeconds":26.09,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.1753739+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":2.73,"FirstCompletionTimeSeconds":2.73,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.1863255+00:00","ETag":{}},{"PartitionKey":"15","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":7.56,"FirstCompletionTimeSeconds":7.56,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.1992698+00:00","ETag":{}},{"PartitionKey":"16","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":12.13,"FirstCompletionTimeSeconds":12.13,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2102217+00:00","ETag":{}},{"PartitionKey":"17","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":23.78,"FirstCompletionTimeSeconds":23.78,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2251564+00:00","ETag":{}},{"PartitionKey":"18","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":59.07,"FirstCompletionTimeSeconds":59.07,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.236108+00:00","ETag":{}},{"PartitionKey":"19","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":64.12,"FirstCompletionTimeSeconds":64.12,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2480565+00:00","ETag":{}},{"PartitionKey":"2","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":12.15,"FirstCompletionTimeSeconds":12.15,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2600041+00:00","ETag":{}},{"PartitionKey":"20","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":33.16,"FirstCompletionTimeSeconds":33.16,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2709562+00:00","ETag":{}},{"PartitionKey":"21","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":188.75,"FirstCompletionTimeSeconds":188.75,"StarCount":1,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2819086+00:00","ETag":{}},{"PartitionKey":"22","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":4.68,"FirstCompletionTimeSeconds":4.68,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.2928609+00:00","ETag":{}},{"PartitionKey":"23","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":25.27,"FirstCompletionTimeSeconds":25.27,"StarCount":3,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.302817+00:00","ETag":{}},{"PartitionKey":"24","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":8.14,"FirstCompletionTimeSeconds":8.14,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.3137691+00:00","ETag":{}},{"PartitionKey":"25","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":55.35,"FirstCompletionTimeSeconds":55.35,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.3247216+00:00","ETag":{}},{"PartitionKey":"26","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":118.05,"FirstCompletionTimeSeconds":118.05,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.3406526+00:00","ETag":{}},{"PartitionKey":"27","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":61.42,"FirstCompletionTimeSeconds":61.42,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.3555869+00:00","ETag":{}},{"PartitionKey":"28","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":49.75,"FirstCompletionTimeSeconds":49.75,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.3655429+00:00","ETag":{}},{"PartitionKey":"29","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":194.73,"FirstCompletionTimeSeconds":194.73,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.377491+00:00","ETag":{}},{"PartitionKey":"3","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":82.17,"FirstCompletionTimeSeconds":82.17,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.3904344+00:00","ETag":{}},{"PartitionKey":"32","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":26.09,"FirstCompletionTimeSeconds":26.09,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4013865+00:00","ETag":{}},{"PartitionKey":"33","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":44.58,"FirstCompletionTimeSeconds":44.58,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4123397+00:00","ETag":{}},{"PartitionKey":"34","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":64.45,"FirstCompletionTimeSeconds":64.45,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.423291+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":7.52,"FirstCompletionTimeSeconds":7.52,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4342431+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":8.42,"FirstCompletionTimeSeconds":8.42,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4461906+00:00","ETag":{}},{"PartitionKey":"37","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":15.51,"FirstCompletionTimeSeconds":15.51,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4581385+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":5.89,"FirstCompletionTimeSeconds":5.89,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.471082+00:00","ETag":{}},{"PartitionKey":"39","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":5.05,"FirstCompletionTimeSeconds":5.05,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4820342+00:00","ETag":{}},{"PartitionKey":"4","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":51.86,"FirstCompletionTimeSeconds":51.86,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.4929863+00:00","ETag":{}},{"PartitionKey":"40","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":85.6,"FirstCompletionTimeSeconds":85.6,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.504934+00:00","ETag":{}},{"PartitionKey":"41","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":14.62,"FirstCompletionTimeSeconds":14.62,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5158863+00:00","ETag":{}},{"PartitionKey":"42","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":18.45,"FirstCompletionTimeSeconds":18.45,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5278339+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":4.98,"FirstCompletionTimeSeconds":4.98,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5377899+00:00","ETag":{}},{"PartitionKey":"44","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":64.12,"FirstCompletionTimeSeconds":64.12,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5517296+00:00","ETag":{}},{"PartitionKey":"45","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":16.66,"FirstCompletionTimeSeconds":16.66,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5636774+00:00","ETag":{}},{"PartitionKey":"46","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":43.2,"FirstCompletionTimeSeconds":43.2,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5756254+00:00","ETag":{}},{"PartitionKey":"47","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":64.47,"FirstCompletionTimeSeconds":64.47,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5865766+00:00","ETag":{}},{"PartitionKey":"48","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":79.5,"FirstCompletionTimeSeconds":79.5,"StarCount":2,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.5975294+00:00","ETag":{}},{"PartitionKey":"49","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":124.58,"FirstCompletionTimeSeconds":124.58,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.6084813+00:00","ETag":{}},{"PartitionKey":"5","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":45.15,"FirstCompletionTimeSeconds":45.15,"StarCount":3,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.6194337+00:00","ETag":{}},{"PartitionKey":"50","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":2,"CompletionCount":0,"Timestamp":"2023-10-05T04:39:55.6313813+00:00","ETag":{}},{"PartitionKey":"6","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":92.66,"FirstCompletionTimeSeconds":92.66,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.6423332+00:00","ETag":{}},{"PartitionKey":"7","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":68.79,"FirstCompletionTimeSeconds":68.79,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.6542817+00:00","ETag":{}},{"PartitionKey":"8","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":93.84,"FirstCompletionTimeSeconds":93.84,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.6662295+00:00","ETag":{}},{"PartitionKey":"9","RowKey":"AndrewShields2:6ee7d16d44a321a9aca794c8b81f642e:0.31","ApiVersion":1,"ClientVersion":0.31,"BestCompletionTimeSeconds":216.86,"FirstCompletionTimeSeconds":216.86,"StarCount":1,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:39:55.6771814+00:00","ETag":{}},{"PartitionKey":"0","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":8.31,"FirstCompletionTimeSeconds":8.31,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.2511754+00:00","ETag":{}},{"PartitionKey":"1","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":24.85,"FirstCompletionTimeSeconds":24.85,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.2641191+00:00","ETag":{}},{"PartitionKey":"10","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":200.79,"FirstCompletionTimeSeconds":200.79,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.275071+00:00","ETag":{}},{"PartitionKey":"11","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":113.59,"FirstCompletionTimeSeconds":113.59,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.2860231+00:00","ETag":{}},{"PartitionKey":"12","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":162.27,"FirstCompletionTimeSeconds":162.27,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.2969752+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":1.79,"FirstCompletionTimeSeconds":1.79,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3099189+00:00","ETag":{}},{"PartitionKey":"14","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":19.78,"FirstCompletionTimeSeconds":19.78,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3218667+00:00","ETag":{}},{"PartitionKey":"15","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":6.5,"FirstCompletionTimeSeconds":6.5,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3328188+00:00","ETag":{}},{"PartitionKey":"16","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":11.73,"FirstCompletionTimeSeconds":11.73,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3427752+00:00","ETag":{}},{"PartitionKey":"17","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":33.61,"FirstCompletionTimeSeconds":33.61,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3537266+00:00","ETag":{}},{"PartitionKey":"18","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":72.6,"FirstCompletionTimeSeconds":72.6,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3646801+00:00","ETag":{}},{"PartitionKey":"19","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":25.3,"FirstCompletionTimeSeconds":25.3,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3756326+00:00","ETag":{}},{"PartitionKey":"2","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":18.02,"FirstCompletionTimeSeconds":18.02,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.3865839+00:00","ETag":{}},{"PartitionKey":"20","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":26.14,"FirstCompletionTimeSeconds":26.14,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.397536+00:00","ETag":{}},{"PartitionKey":"21","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":253.77,"FirstCompletionTimeSeconds":253.77,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4094852+00:00","ETag":{}},{"PartitionKey":"22","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":3.59,"FirstCompletionTimeSeconds":3.59,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4214315+00:00","ETag":{}},{"PartitionKey":"23","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":12.52,"FirstCompletionTimeSeconds":12.52,"StarCount":3,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4323839+00:00","ETag":{}},{"PartitionKey":"24","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":44.87,"FirstCompletionTimeSeconds":44.87,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4443315+00:00","ETag":{}},{"PartitionKey":"25","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":136.0,"FirstCompletionTimeSeconds":136.0,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4552835+00:00","ETag":{}},{"PartitionKey":"26","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":96.4,"FirstCompletionTimeSeconds":96.4,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4662358+00:00","ETag":{}},{"PartitionKey":"27","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":76.1,"FirstCompletionTimeSeconds":76.1,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.4771878+00:00","ETag":{}},{"PartitionKey":"28","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":83.76,"FirstCompletionTimeSeconds":83.76,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.490132+00:00","ETag":{}},{"PartitionKey":"29","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":248.29,"FirstCompletionTimeSeconds":248.29,"StarCount":1,"AttemptCount":3,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5020793+00:00","ETag":{}},{"PartitionKey":"3","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":64.05,"FirstCompletionTimeSeconds":64.05,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5200009+00:00","ETag":{}},{"PartitionKey":"30","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":165.22,"FirstCompletionTimeSeconds":165.22,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5319479+00:00","ETag":{}},{"PartitionKey":"31","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":62.59,"FirstCompletionTimeSeconds":62.59,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5429009+00:00","ETag":{}},{"PartitionKey":"32","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":31.97,"FirstCompletionTimeSeconds":31.97,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5538528+00:00","ETag":{}},{"PartitionKey":"33","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":116.42,"FirstCompletionTimeSeconds":116.42,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5727702+00:00","ETag":{}},{"PartitionKey":"34","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":99.33,"FirstCompletionTimeSeconds":99.33,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5837225+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":4.68,"FirstCompletionTimeSeconds":4.68,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.5966659+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":10.64,"FirstCompletionTimeSeconds":10.64,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.6086135+00:00","ETag":{}},{"PartitionKey":"37","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":32.41,"FirstCompletionTimeSeconds":32.41,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.6195658+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":9.82,"FirstCompletionTimeSeconds":9.82,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.6315139+00:00","ETag":{}},{"PartitionKey":"39","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":10.74,"FirstCompletionTimeSeconds":10.74,"StarCount":3,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.6494354+00:00","ETag":{}},{"PartitionKey":"4","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":38.28,"FirstCompletionTimeSeconds":38.28,"StarCount":3,"AttemptCount":2,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.6693484+00:00","ETag":{}},{"PartitionKey":"40","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":61.98,"FirstCompletionTimeSeconds":61.98,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.681296+00:00","ETag":{}},{"PartitionKey":"41","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":5.44,"FirstCompletionTimeSeconds":5.44,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.6932441+00:00","ETag":{}},{"PartitionKey":"42","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":31.37,"FirstCompletionTimeSeconds":31.37,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.7081779+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":6.87,"FirstCompletionTimeSeconds":6.87,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.7221177+00:00","ETag":{}},{"PartitionKey":"44","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":40.63,"FirstCompletionTimeSeconds":40.63,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.7340656+00:00","ETag":{}},{"PartitionKey":"45","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":17.55,"FirstCompletionTimeSeconds":17.55,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.7450177+00:00","ETag":{}},{"PartitionKey":"46","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":40.79,"FirstCompletionTimeSeconds":40.79,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.7569648+00:00","ETag":{}},{"PartitionKey":"47","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":269.16,"FirstCompletionTimeSeconds":269.16,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.766922+00:00","ETag":{}},{"PartitionKey":"48","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":608.04,"FirstCompletionTimeSeconds":608.04,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.7768786+00:00","ETag":{}},{"PartitionKey":"49","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":154.22,"FirstCompletionTimeSeconds":154.22,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.789822+00:00","ETag":{}},{"PartitionKey":"5","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":60.97,"FirstCompletionTimeSeconds":60.97,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.8027654+00:00","ETag":{}},{"PartitionKey":"50","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":253.42,"FirstCompletionTimeSeconds":253.42,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.8157093+00:00","ETag":{}},{"PartitionKey":"6","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":107.69,"FirstCompletionTimeSeconds":107.69,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.8306431+00:00","ETag":{}},{"PartitionKey":"7","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":45.77,"FirstCompletionTimeSeconds":45.77,"StarCount":3,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.8425918+00:00","ETag":{}},{"PartitionKey":"8","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":86.52,"FirstCompletionTimeSeconds":86.52,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.8535436+00:00","ETag":{}},{"PartitionKey":"9","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":664.44,"FirstCompletionTimeSeconds":664.44,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:37:50.864495+00:00","ETag":{}},{"PartitionKey":"0","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":4.35,"FirstCompletionTimeSeconds":4.35,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.3792524+00:00","ETag":{}},{"PartitionKey":"1","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":24.52,"FirstCompletionTimeSeconds":24.52,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.3921959+00:00","ETag":{}},{"PartitionKey":"10","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":202.74,"FirstCompletionTimeSeconds":202.74,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4071307+00:00","ETag":{}},{"PartitionKey":"11","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":170.39,"FirstCompletionTimeSeconds":170.39,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4190789+00:00","ETag":{}},{"PartitionKey":"12","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":190.5,"FirstCompletionTimeSeconds":190.5,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4300307+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":2.02,"FirstCompletionTimeSeconds":2.02,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4429741+00:00","ETag":{}},{"PartitionKey":"14","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":7.4,"FirstCompletionTimeSeconds":7.4,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4539262+00:00","ETag":{}},{"PartitionKey":"15","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":5.39,"FirstCompletionTimeSeconds":5.39,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.465874+00:00","ETag":{}},{"PartitionKey":"16","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":17.87,"FirstCompletionTimeSeconds":17.87,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4768258+00:00","ETag":{}},{"PartitionKey":"17","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":25.5,"FirstCompletionTimeSeconds":25.5,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.4877782+00:00","ETag":{}},{"PartitionKey":"18","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":56.82,"FirstCompletionTimeSeconds":56.82,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5007219+00:00","ETag":{}},{"PartitionKey":"19","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":130.06,"FirstCompletionTimeSeconds":130.06,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5126709+00:00","ETag":{}},{"PartitionKey":"2","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":14.32,"FirstCompletionTimeSeconds":14.32,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5236226+00:00","ETag":{}},{"PartitionKey":"20","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":28.0,"FirstCompletionTimeSeconds":28.0,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.534574+00:00","ETag":{}},{"PartitionKey":"21","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":37.78,"FirstCompletionTimeSeconds":37.78,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5455262+00:00","ETag":{}},{"PartitionKey":"22","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":12.89,"FirstCompletionTimeSeconds":12.89,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5564781+00:00","ETag":{}},{"PartitionKey":"23","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":8.6,"FirstCompletionTimeSeconds":8.6,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5684257+00:00","ETag":{}},{"PartitionKey":"24","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":11.06,"FirstCompletionTimeSeconds":11.06,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5793781+00:00","ETag":{}},{"PartitionKey":"25","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":43.53,"FirstCompletionTimeSeconds":43.53,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.5903304+00:00","ETag":{}},{"PartitionKey":"26","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":56.54,"FirstCompletionTimeSeconds":56.54,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6012824+00:00","ETag":{}},{"PartitionKey":"27","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":75.49,"FirstCompletionTimeSeconds":75.49,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6122346+00:00","ETag":{}},{"PartitionKey":"28","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":68.36,"FirstCompletionTimeSeconds":68.36,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6241823+00:00","ETag":{}},{"PartitionKey":"29","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":201.78,"FirstCompletionTimeSeconds":201.78,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6351346+00:00","ETag":{}},{"PartitionKey":"3","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":89.48,"FirstCompletionTimeSeconds":89.48,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6460867+00:00","ETag":{}},{"PartitionKey":"30","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":184.7,"FirstCompletionTimeSeconds":184.7,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6580344+00:00","ETag":{}},{"PartitionKey":"31","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":116.42,"FirstCompletionTimeSeconds":116.42,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6689866+00:00","ETag":{}},{"PartitionKey":"32","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":26.24,"FirstCompletionTimeSeconds":26.24,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6799387+00:00","ETag":{}},{"PartitionKey":"33","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":113.7,"FirstCompletionTimeSeconds":113.7,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.6908909+00:00","ETag":{}},{"PartitionKey":"34","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":69.74,"FirstCompletionTimeSeconds":69.74,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7028387+00:00","ETag":{}},{"PartitionKey":"35","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":4.11,"FirstCompletionTimeSeconds":4.11,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7137908+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":11.51,"FirstCompletionTimeSeconds":11.51,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7247437+00:00","ETag":{}},{"PartitionKey":"37","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":18.62,"FirstCompletionTimeSeconds":18.62,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7356967+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":7.46,"FirstCompletionTimeSeconds":7.46,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7466478+00:00","ETag":{}},{"PartitionKey":"39","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":14.87,"FirstCompletionTimeSeconds":14.87,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7576001+00:00","ETag":{}},{"PartitionKey":"4","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":19.96,"FirstCompletionTimeSeconds":19.96,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7685529+00:00","ETag":{}},{"PartitionKey":"40","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":43.89,"FirstCompletionTimeSeconds":43.89,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7785088+00:00","ETag":{}},{"PartitionKey":"41","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":12.04,"FirstCompletionTimeSeconds":12.04,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.7904558+00:00","ETag":{}},{"PartitionKey":"42","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":18.97,"FirstCompletionTimeSeconds":18.97,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8004131+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":5.49,"FirstCompletionTimeSeconds":5.49,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.812361+00:00","ETag":{}},{"PartitionKey":"44","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":57.61,"FirstCompletionTimeSeconds":57.61,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.823313+00:00","ETag":{}},{"PartitionKey":"45","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":23.18,"FirstCompletionTimeSeconds":23.18,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8352625+00:00","ETag":{}},{"PartitionKey":"46","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":42.77,"FirstCompletionTimeSeconds":42.77,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8482049+00:00","ETag":{}},{"PartitionKey":"47","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":90.11,"FirstCompletionTimeSeconds":90.11,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8601534+00:00","ETag":{}},{"PartitionKey":"48","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":237.99,"FirstCompletionTimeSeconds":237.99,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8711107+00:00","ETag":{}},{"PartitionKey":"49","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":222.51,"FirstCompletionTimeSeconds":222.51,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8830521+00:00","ETag":{}},{"PartitionKey":"5","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":39.99,"FirstCompletionTimeSeconds":39.99,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.8940049+00:00","ETag":{}},{"PartitionKey":"50","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":100.58,"FirstCompletionTimeSeconds":100.58,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.9049563+00:00","ETag":{}},{"PartitionKey":"6","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":114.04,"FirstCompletionTimeSeconds":114.04,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.9169042+00:00","ETag":{}},{"PartitionKey":"7","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":86.69,"FirstCompletionTimeSeconds":86.69,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.9298476+00:00","ETag":{}},{"PartitionKey":"8","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":98.6,"FirstCompletionTimeSeconds":98.6,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.9407997+00:00","ETag":{}},{"PartitionKey":"9","RowKey":"AndrewShields:6ee7d16d44a321a9aca794c8b81f642e:0.28","ApiVersion":1,"ClientVersion":0.28,"BestCompletionTimeSeconds":226.23,"FirstCompletionTimeSeconds":226.23,"StarCount":0,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T04:36:27.9557347+00:00","ETag":{}},{"PartitionKey":"0","RowKey":"TiaThe:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":31.49,"FirstCompletionTimeSeconds":31.49,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T03:18:05.047597+00:00","ETag":{}},{"PartitionKey":"13","RowKey":"TiaThe:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":4.02,"FirstCompletionTimeSeconds":4.02,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T03:18:05.0585488+00:00","ETag":{}},{"PartitionKey":"36","RowKey":"TiaThe:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":-1.0,"FirstCompletionTimeSeconds":-1.0,"StarCount":0,"AttemptCount":1,"CompletionCount":0,"Timestamp":"2023-10-05T03:18:05.0714925+00:00","ETag":{}},{"PartitionKey":"38","RowKey":"TiaThe:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":10.1,"FirstCompletionTimeSeconds":10.1,"StarCount":1,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T03:18:05.0824438+00:00","ETag":{}},{"PartitionKey":"43","RowKey":"TiaThe:6ee7d16d44a321a9aca794c8b81f642e:0.30","ApiVersion":1,"ClientVersion":0.3,"BestCompletionTimeSeconds":7.08,"FirstCompletionTimeSeconds":7.08,"StarCount":2,"AttemptCount":1,"CompletionCount":1,"Timestamp":"2023-10-05T03:18:05.0943919+00:00","ETag":{}}];
			setRawLevelInfos(DEBUG_DATA);
		}
	}, []);

	useEffect(() => {
		function populateTable(): void {
			if (rawLevelInfos === undefined) {
				return;
			}

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

			// Push median data now so it's at the top by default
			const medianRowInfo: any = { // TODO Shields type IRowInfo
				PlayerId: "Median-row", // This name is tied to custom CSS
				Version: ""
			};
			rowInfos.push(medianRowInfo);

			const rowInfoOfAllLevelInfosForMedianData: any = {};
			const playerIds = Object.keys(playerLevelInfosHash);
			for (const playerId of playerIds) {
				const levelInfos = playerLevelInfosHash[playerId];
				const rowInfo: any = { // TODO Shields type IRowInfo
					PlayerId: playerId,
					Version: `${levelInfos[0].ApiVersion} / ${levelInfos[0].ClientVersion.toFixed(2)}`
				};

				for (const levelInfo of levelInfos) {
					const levelId = levelInfo.PartitionKey;
					const levelBestTimeKey = `L${levelId}_BestTime`;
					const levelFirstTimeKey = `L${levelId}_FirstTime`;
					const levelStarsKey = `L${levelId}_Stars`;
					const levelAttemptsKey = `L${levelId}_Attempts`;
					const levelCompletionsKey = `L${levelId}_Completions`;

					rowInfo[levelBestTimeKey] = levelInfo.BestCompletionTimeSeconds;
					rowInfo[levelFirstTimeKey] = levelInfo.FirstCompletionTimeSeconds;
					rowInfo[levelStarsKey] = levelInfo.StarCount;
					rowInfo[levelAttemptsKey] = levelInfo.AttemptCount;
					rowInfo[levelCompletionsKey] = levelInfo.CompletionCount;

					// Accumulate data for median
					accumulateMedianData(rowInfoOfAllLevelInfosForMedianData, levelBestTimeKey, levelInfo.BestCompletionTimeSeconds);
					accumulateMedianData(rowInfoOfAllLevelInfosForMedianData, levelFirstTimeKey, levelInfo.FirstCompletionTimeSeconds);
					accumulateMedianData(rowInfoOfAllLevelInfosForMedianData, levelStarsKey, levelInfo.StarCount);
					accumulateMedianData(rowInfoOfAllLevelInfosForMedianData, levelAttemptsKey, levelInfo.AttemptCount);
					accumulateMedianData(rowInfoOfAllLevelInfosForMedianData, levelCompletionsKey, levelInfo.CompletionCount);
				}

				rowInfos.push(rowInfo);
			}

			// Generate median row
			const columnKeys = getColumnKeys();
			for (const key of columnKeys) {
				if (!Array.isArray(rowInfoOfAllLevelInfosForMedianData[key])) {
					continue;
				}

				medianRowInfo[key] = getMedian(rowInfoOfAllLevelInfosForMedianData[key]);
			}

			setMedianRowInfo(medianRowInfo);

			// Populate rows
			const _rows: IRowInfo[] = rowInfos;
			setRows(_rows);

			// Populate columns
			const _columns: GridColDef[] = [];
			for (const key of columnKeys) {
				const columnDef: GridColDef = {
					field: key,
					headerName: key
				}

				if (key === "PlayerId") {
					columnDef.width = 500;
				} else if (key === "Version") {
					columnDef.width = 125;
				} else if (key.endsWith("_BestTime") || key.endsWith("_FirstTime")) {
					if ((!showBestTime && key.endsWith("_BestTime")) || (!showFirstTime && key.endsWith("_FirstTime"))) {
						continue;
					}

					columnDef.width = 125;
					columnDef.type = "number";
					columnDef.valueFormatter = (params) => {
						const timeSeconds: number = params.value;
						return getTimeSecondsString(timeSeconds);
					};
				} else if (key.endsWith("_Stars") || key.endsWith("_Attempts") || key.endsWith("_Completions")) {
					if ((!showStars && key.endsWith("_Stars")) || (!showAttempts && key.endsWith("_Attempts")) || (!showCompletions && key.endsWith("_Completions"))) {
						continue;
					}

					columnDef.width = 125;
					columnDef.type = "number";
					columnDef.valueFormatter = (params) => {
						const count: number = params.value;
						return getCountString(count);
					};
				}

				_columns.push(columnDef);
			}

			_columns.sort((a, b) => parseInt(a.description!) - parseInt(b.description!));

			setColumns(_columns);
		}

		function accumulateMedianData(rowInfoOfAllLevelInfosForMedianData: any, key: string, value: number): void {
			if (rowInfoOfAllLevelInfosForMedianData[key] === undefined) {
				rowInfoOfAllLevelInfosForMedianData[key] = [];
			}

			if (value > 0) {
				rowInfoOfAllLevelInfosForMedianData[key].push(value);
			}
		}

		function getTimeSecondsString(timeSeconds: number): string {
			if (timeSeconds === undefined) {
				return "-"; // Locked
			} else if (timeSeconds === -1) {
				return "+"; // Unlocked but incomplete
			}

			const minutes = Math.floor(timeSeconds / 60);
			const seconds = (timeSeconds - (minutes * 60)).toFixed(2);

			if (minutes > 0) {
				// 00:00.00
				return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(5, "0")}`;
			}
			// 00.00
			return `${seconds}`;
		}

		function getCountString(count: number): string {
			if (count === undefined) {
				return "-"; // Locked
			} else if (count === -1) {
				return "+"; // Unlocked but incomplete
			}
			return count.toString();
		}

		function getColumnKeys(): string[] {
			const columnKeys: string[] = [];
			columnKeys.push("PlayerId");
			columnKeys.push("Version");

			const levelIds = [
				13, 43, 38, 0, 36, 35, 39,
				15, 41, 45, 42, 1, 37, 20, 16, 17, 2, 46,
				22, 32, 3, 4, 7,
				23, 26, 6, 44, 40, 28, 25, 34, 18, 5,
				24, 19, 27, 8, 29, 33, 9, 21, 49, 48, 47, 50,
				14, 31, 30, 11, 10, 12,
			];

			for (const levelId of levelIds) {
				columnKeys.push(`L${levelId}_BestTime`);
				columnKeys.push(`L${levelId}_FirstTime`);
				columnKeys.push(`L${levelId}_Stars`);
				columnKeys.push(`L${levelId}_Attempts`);
				columnKeys.push(`L${levelId}_Completions`);
			}

			return columnKeys;
		}

		function getMedian(numbers: number[]): number {
			const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
			const middleIndex = Math.floor(sortedNumbers.length / 2);

			let medianValue: number;
			if (sortedNumbers.length % 2 === 0) {
				medianValue = (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
			} else {
				medianValue = sortedNumbers[middleIndex];
			}

			return Math.round(medianValue * 100) / 100;
		}

		// Main
		if (rawLevelInfos !== undefined) {
			populateTable();
		}
	}, [ rawLevelInfos, showBestTime, showFirstTime, showStars, showAttempts, showCompletions ]);

	function toggleShowBestTime() {
		setShowBestTime(!showBestTime);
	}

	function toggleShowFirstTime() {
		setShowFirstTime(!showFirstTime);
	}

	function toggleShowStars() {
		setShowStars(!showStars);
	}

	function toggleShowAttempts() {
		setShowAttempts(!showAttempts);
	}

	function toggleShowCompletions() {
		setShowCompletions(!showCompletions);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100%-50px)", padding: "10px" }}>
			<div style={{ fontFamily: "monospace" }}>
				<label className="show-hide-checkbox">
					<input type="checkbox" checked={showBestTime} onChange={toggleShowBestTime} />
					Show best time
				</label>
				<label className="show-hide-checkbox">
					<input type="checkbox" checked={showFirstTime} onChange={toggleShowFirstTime} />
					Show first time
				</label>
				<label className="show-hide-checkbox">
					<input type="checkbox" checked={showStars} onChange={toggleShowStars} />
					Show stars
				</label>
				<label className="show-hide-checkbox">
					<input type="checkbox" checked={showAttempts} onChange={toggleShowAttempts} />
					Show attempts
				</label>
				<label className="show-hide-checkbox">
					<input type="checkbox" checked={showCompletions} onChange={toggleShowCompletions} />
					Show completions
				</label>
			</div>

			<Box sx={{ minWidth: "400px", "& .MuiDataGrid-root": { fontFamily: "monospace" }, "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" } }}>
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
					getRowClassName={(params) => `${params.row.PlayerId}`} // "Median-row" gets custom skin
					getCellClassName={(params: GridCellParams<any, any, number>) => {
						if ([ "__check__", "PlayerId", "Version" ].includes(params.field) || [ undefined, -1 ].includes(params.value)) {
							return "";
						}

						// Lower times are "better", higher counts are "better"
						let valueA: number;
						let valueB: number;
						const medianValue = parseFloat((medianRowInfo as any)[params.field]);
						if (params.field.endsWith("_BestTime") || params.field.endsWith("_FirstTime")) {
							valueA = params.value;
							valueB = medianValue;
						} else {
							valueA = medianValue;
							valueB = params.value;
						}

						if (valueA < valueB) {
							return "better-than-median";
						} else if (valueA > valueB) {
							return "worse-than-median";
						}
						return "equal-to-median";
					  }}
				/>
			</Box>
		</div>
	);
}
