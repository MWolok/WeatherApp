import "./App.css";
import DisplayWeather from "./DisplayWeather";
import { CityContextProvider } from "./context/CityContext";
import { CloudContextProvider } from "./context/CloudContext";
import SearchComponent from "./searchComponent";

function App() {
	return (
		<div className="wrapper">
			<CityContextProvider>
				<CloudContextProvider>
					<SearchComponent></SearchComponent>
					<DisplayWeather></DisplayWeather>
				</CloudContextProvider>
			</CityContextProvider>
		</div>
	);
}

export default App;
