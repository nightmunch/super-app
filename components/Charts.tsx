import "chart.js/auto";
import { useAtom } from "jotai";
import { Chart } from "react-chartjs-2";
import { shadeColor } from "../helpers/helpers";
import { themeAtom } from "./MainLayout";

interface Input {
	title: string;
	data: {
		category: string;
		color: string;
		amount: number | null;
	}[];
}

export const Doughnut = ({ title, data }: Input) => {
	const [theme, setTheme] = useAtom(themeAtom);

	const themeDict = new Map([
		["shahrin", "#b7cdda"],
		["aimi", "#343536"],
	]);

	return (
		<>
			<h1 className="text-center">{title}</h1>
			<div className="w-72 sm:w-96 mx-auto text-">
				<Chart
					type="doughnut"
					data={{
						labels: data.map((data) => data.category),
						datasets: [
							{
								data: data.map((data) => data.amount),
								backgroundColor: data.map((data) => data.color),
								borderColor: data.map((data) => shadeColor(data.color, -60)),
							},
						],
					}}
					options={{
						elements: {
							arc: {
								borderWidth: 2,
								borderRadius: 10,
								hoverOffset: 10,
							},
						},
						plugins: {
							legend: {
								labels: {
									color: themeDict.get(theme),
								},
							},
						},
						responsive: true,
						cutout: "50%",
					}}
					plugins={[
						{
							id: "increase-legend-spacing",
							beforeInit(chart) {
								// Get reference to the original fit function
								const originalFit = (chart.legend as any).fit;
								// Override the fit function
								(chart.legend as any).fit = function fit() {
									// Call original function and bind scope in order to use `this` correctly inside it
									originalFit.bind(chart.legend)();
									this.height += 10;
								};
							},
						},
					]}
				/>
			</div>
		</>
	);
};
