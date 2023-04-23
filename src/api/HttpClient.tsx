import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export interface IHttpGETProps {
	endpoint: string;
	token: any;
	params: any | any[];
}

export interface IHttpPOSTProps {
	endpoint: string;
	token: any;
	body: any | any[];
}

export interface IHttpClient {
	get<T>(parameters: IHttpGETProps): Promise<T>;
}

const BASE_URL = "https://fnappblockandball.azurewebsites.net/api/FnBlockAndBall/v1/";

export default class HttpClient implements IHttpClient {
	get<T>(parameters: IHttpGETProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {endpoint, token, params } = parameters;

			const options: AxiosRequestConfig = {
				headers: token,
				params,
				withCredentials: false
			}

			axios.get(BASE_URL + endpoint, options)
				.then((response: any) => {
					resolve(response as T);
				}).catch((reason: any) => {
					console.error(reason);
					reject(reason);
				}
			);
		});
	}

	post<T>(parameters: IHttpPOSTProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {endpoint, token, body } = parameters;

			const headers = { "Content-Type": "application/json" };

			const options: AxiosRequestConfig = {
				headers: headers /* token? */,
				withCredentials: false
			}

			axios.post(BASE_URL + endpoint, body, options)
				.then((response: any) => {
					resolve(response as T);
				}).catch((reason: any) => {
					console.error(reason);
					reject(reason);
				}
			);
		});
	}
}
