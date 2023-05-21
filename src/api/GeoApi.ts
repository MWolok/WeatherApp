import axios from "axios";
import { GeoApiRespons } from "../model/GeoApiRes";
import { City } from "../model/City";

export class GeoApi {
	static getCitis = async (searchTerm: string) =>
		axios.get<GeoApiRespons<City>>(
			"https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
			{
				params: { minPopulation: "1000", limit: "4", namePrefix: searchTerm, countryIds: "PL" },
				headers: {
					"X-RapidAPI-Key":
						process.env.REACT_APP_GEO_API_AUTH_KEY,
					"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
				},
			}
		);
}
