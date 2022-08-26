import "chart.js/auto";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

type Input = {
	title: string;
	data: {
		category: string;
		color: string;
		amount: number | null;
	}[];
};

type WindowSize = {
	width: number | undefined;
	height: number | undefined;
};

export const Doughnut: React.FunctionComponent<Input> = ({ title, data }) => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	// Handler to call on window resize
	function handleResize() {
		// Set window width/height to state
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEffect(() => {
		// only execute all the code below in client side
		if (typeof window !== "undefined") {
			// Add event listener
			window.addEventListener("resize", handleResize);

			// Call handler right away so state gets updated with initial window size
			handleResize();

			// Remove event listener on cleanup
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	return (
		<>
			<h1 className="text-center">{title}</h1>
			<div className="w-72 sm:w-96 mx-auto">
				<Chart
					type="doughnut"
					data={{
						labels: data.map((data) => data.category),
						datasets: [
							{
								data: data.map((data) => data.amount),
								backgroundColor: data.map((data) => data.color),
							},
						],
					}}
					options={{
						elements: {
							arc: {
								borderWidth: 0,
							},
						},
						plugins: {
							legend: {
								labels: {
									color: "rgb(183,205,218)",
								},
							},
						},
						responsive: true,
						cutout: windowSize.width! > 500 ? 120 : 70,
					}}
				/>
			</div>
		</>
	);
};
