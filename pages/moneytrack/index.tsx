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
				<div className="card-body gap-5 items-stretch">
					<Doughnut title="Transaction Summary July 2022" data={data} />
					<div className="overflow-x-auto">
						<table className="table table-auto table-zebra w-full">
							<thead>
								<tr>
									<th></th>
									<th>Category</th>
									<th>Amount</th>
									<th>%</th>
								</tr>
							</thead>
							<tbody>
								{data.map((data, index) => (
									<tr>
										<td>{index + 1}</td>
										<td className="flex items-center gap-2">
											<div
												className={`badge badge-info badge-sm`}
												style={{
													backgroundColor: `${data.color}`,
												}}
											></div>{" "}
											{data.category}
										</td>
										<td>-RM {data.amount}</td>
										<td>2%</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
