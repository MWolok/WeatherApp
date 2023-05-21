import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import "./DisplayWeather.css";
import { FutureWeatherDto } from "./model/FutureWeatherApiDto";
import { WeatherApi } from "./api/WatherApi";
import { addDays, differenceInCalendarDays, format, isSameDay } from "date-fns";

import { CityContext } from "./context/CityContext";
import { CloudContext } from "./context/CloudContext";

// import {debounce} from "lodash";

const DisplayWeather = () => {
	const [forecast, setForecast] = useState<FutureWeatherDto | null>(null);
	const { selectedCity } = useContext(CityContext);
	const curentClouds = useContext(CloudContext);
	useEffect(() => {
		fetchFutureWeather();
	}, [selectedCity]);

	const fetchFutureWeather = async () => {
		if (!selectedCity) {
			return;
		}
		
		const result = await WeatherApi.getFutureWeather(
			selectedCity.latitude,
			selectedCity.longitude
		);
		// curentClouds.curentCloudsModifier(forecast!.list[0].clouds)
		setForecast(result.data);
		console.log(result.data)
	};

	const getDays = useMemo(() => {
		if (!forecast) {
			return [];
		}
		curentClouds.curentCloudsModifier(forecast.list[0].clouds)
		const startDtae = new Date(forecast.list[0].dt * 1000);
		const endDtae = new Date(forecast.list[forecast.cnt - 1].dt * 1000);
		const dayAmount = differenceInCalendarDays(endDtae, startDtae) + 1;
		const groupedDays = [];
		for (let index = 1; index < dayAmount; index++) {
			const date = addDays(startDtae, index);

			groupedDays.push({
				name: format(date, "EEEE"),
				forecast: forecast.list.filter((forecast) =>
					isSameDay(new Date(forecast.dt * 1000), date)
				),
			});
		}

		return groupedDays;
	}, [forecast]);

	const grupedTemp = useMemo(() => {
		const temp: number[][] = getDays.map((m) =>
			m.forecast.map((a) => a.main.temp)
		);
			
		return temp;
	
	}, [getDays]);

	const avrTempForEachDay = useMemo(() => {
		const tempertures: number[] = [];
		for (let index = 0; index < grupedTemp.length; index++) {
			const sumTemp = grupedTemp[index].flat(1).reduce((total, item) => {
				let sum = total + item;
				return sum;
			}, 0);
			tempertures.push(sumTemp / grupedTemp[index].length);
		}
		return tempertures;
	}, [grupedTemp]);

	return (
		<div className="bottom">
			<div className="headings">
				<p>Presure:</p>
				<p>Temperature:</p>
				<p>Humidity:</p>
			</div>
			<div className="weather-info">
				<p className="weather">{forecast?.list[0].main.pressure}</p>
				<p className="temperature">{forecast?.list[0].main.temp}</p>
				<p className="humidity">{forecast?.list[0].main.humidity}</p>
			</div>
			<div className="week-info">
				<div className="days-info">
				{getDays.map((day, index) => (
					<div key={day.name} className="day">
						<h3 className="day-name">{day.name}</h3>
						<p className="temp">{Math.round(avrTempForEachDay[index])}C</p>
						
					</div>
				))}</div>
			</div>
			<a></a>
		</div>
	);
};
export default DisplayWeather;
