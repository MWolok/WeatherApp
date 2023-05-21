import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import "./SearchComponent.css";

import { debounce } from "lodash";
import {
	minChartoTrigerSearch,
	searchDebounceWaitms,
} from "./constants/constans";
import { GeoApi } from "./api/GeoApi";
import { RegionType } from "./model/RegioType";
import { City } from "./model/City";
import { CityContext } from "./context/CityContext";
import { CloudContext } from "./context/CloudContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun } from "@fortawesome/free-regular-svg-icons";
import { WiCloudy } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";

const SearchComponent = () => {
	const [city, setCity] = useState("");

	const [suggestion, setSuggestions] = useState<City[]>([]);
	const cityContext = useContext(CityContext);
	const { curentClouds } = useContext(CloudContext);

	// const API_KEY: any = "620fff03384dc7d1007b262dc2aed034";

	const searchHendler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	};

	const searchCitis = useCallback(async (term: string) => {
		const result = await GeoApi.getCitis(term);
		const filteredResults = result.data.data.filter(
			(x) => x.type === RegionType.City
		);
		setSuggestions(filteredResults);
		console.log(filteredResults);
	}, []);

	const debounceSearch = useMemo(
		() =>
			debounce((term: string) => {
				searchCitis(term);
			}, 2000),
		[searchCitis]
	);
	// const clearSugAfterSelection = () => {
	// 	setSuggestions(()=>[]);
	// };

	useEffect(() => {
		if (city.length >= minChartoTrigerSearch) {
			debounceSearch(city);
		}
	}, [city]);

	const onSelectedCity = (selectedCity: City) => {
		cityContext.selectedCityModifier(selectedCity);
		setSuggestions([]);
		setCity("")
	};

	const sugestionsMap = suggestion.map((city, i) => (
		<ul>
			<li onClick={() => onSelectedCity(city)} key={i}>
				{city.name}
			</li>
		</ul>
	));
//spr tylko procent zachmurzenia
	const cloud = () => {
		if (!curentClouds) {
			return <div></div>;
		}
		if (curentClouds.all <= 25) {
			return <WiDaySunny style={{ fontSize: "200px" }}></WiDaySunny>;
		}
		if (curentClouds.all <= 50) {
			return <WiDayCloudy style={{ fontSize: "200px" }}></WiDayCloudy>;
		}
		if (curentClouds.all <= 75) {
			return <WiCloud style={{ fontSize: "200px" }}></WiCloud>;
		}
		if (curentClouds.all <= 100) {
			return <WiCloudy style={{ fontSize: "200px" }}></WiCloudy>;
		}
	};

	return (
		<div className="top">
			<h1>weather app</h1>
			<h3>{cityContext.selectedCity?.name}</h3>
			<div className="main-info">
				<div className="left-side">
					<input
						type="text"
						onChange={searchHendler}
						value={city}
						placeholder="Wpisz nazwę miasta..."
					/>
					{/* <button onClick={() => cityContext.selectedCityModifier(null)}>Clear</button> */}
					{suggestion.length >= 1 ? sugestionsMap : <></>}
				</div>
				<div className="right-side">{cloud()}</div>
			</div>
		</div>
	);
};
export default SearchComponent;
