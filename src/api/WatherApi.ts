import axios from "axios";
import { FutureWeatherDto } from "../model/FutureWeatherApiDto";

export class WeatherApi {
	static getFutureWeather = async (lat: number, lon: number) =>
		await axios.get<FutureWeatherDto>(
			"https://api.openweathermap.org/data/2.5/forecast",
			{
				params: {
					lat: lat,
					lon: lon,
					appid:"620fff03384dc7d1007b262dc2aed034",
					units: "metric",
				},
			}
		);
}
