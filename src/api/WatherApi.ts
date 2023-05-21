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
					appid:process.env.REACT_APP_WEATHER_API_KEY,
					units: "metric",
				},
			}
		);
}
