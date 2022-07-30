import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";
import { Doughnut } from "../../components/Charts";

export default function MoneyTrack() {
	const data = [
		{ category: "Food & Beverages", color: "#e76f51", amount: 5 },
		{ category: "Transportation", color: "#f4a261", amount: 6 },
		{ category: "Shopping", color: "#e9c46a", amount: 7 },
		{ category: "Dating", color: "#2a9d8f", amount: 8 },
		{ category: "Test", color: "#264653", amount: 9 },
	];
	return (
		<>
			<MoneyTrackLayout></MoneyTrackLayout>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<Doughnut title="Transaction Summary July 2022" data={data} />
			</div>
		</>
	);
}
