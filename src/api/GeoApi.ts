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
						"771f786c66mshf0d71ed76da7749p1682ddjsn32a4c81c0ed4",
					"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
				},
			}
		);
}
