import { CloudsDto } from "../model/CloudsDto";
import { createContext, useState } from "react";

type WeatherContexType = {
	curentClouds: CloudsDto | null;
	curentCloudsModifier: (cloud: CloudsDto | null) => void;
};
const defaultSettings: WeatherContexType = {
	curentClouds: null,
	curentCloudsModifier: (cloud: CloudsDto | null) => {},
};
export const CloudContext = createContext<WeatherContexType>(defaultSettings);
export const CloudContextProvider = (props: React.PropsWithChildren) => {
	const [curentClouds, setCurentClouds] = useState<CloudsDto | null>(null);
	const curentCloudsModifier = (cloud: CloudsDto | null) => {
		setCurentClouds(cloud);
	};
	return (
		<CloudContext.Provider
			value={{
				curentClouds: curentClouds,
				curentCloudsModifier: curentCloudsModifier,
			}}>
			{props.children}
		</CloudContext.Provider>
	);
};
