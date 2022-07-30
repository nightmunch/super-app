import "chart.js/auto";
import { Chart } from "react-chartjs-2";

type Input = {
	title: string;
	data: {
		category: string;
		color: string;
		amount: number;
	}[];
};

export const Doughnut: React.FunctionComponent<Input> = ({ title, data }) => {
	return (
		<>
			<div className="card-body items-center gap-4">
				<h1>{title}</h1>
				<div>
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
							cutout: 80,
						}}
					/>
				</div>
			</div>
		</>
	);
};
