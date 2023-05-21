import { createContext, useState } from "react";
import { City } from "../model/City";
import { MeasurementDto } from "../model/MeasurementDto";

type CityContextType = {
	selectedCity: City | null;
	selectedCityModifier: (city: City | null) => void;

};
const defaultSettings: CityContextType = {
	selectedCity: null,
	selectedCityModifier: (city: City | null) => {},

};
export const CityContext = createContext<CityContextType>(defaultSettings);

export const CityContextProvider = (props: React.PropsWithChildren) => {
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const selectedCityModifier = (city: City | null) => {
		setSelectedCity(city);
	};


	return (
		<CityContext.Provider
			value={{
				selectedCity: selectedCity,
				selectedCityModifier: selectedCityModifier,
         
			}}>
			{props.children}
		</CityContext.Provider>
	);
};
