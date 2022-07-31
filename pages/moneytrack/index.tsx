import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";
import { Doughnut } from "../../components/Charts";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { RiEmotionSadLine } from "react-icons/ri";

export default function MoneyTrack() {
	let data: any[] = [];

	let categories = [
		{ category: "Food & Beverages", color: "#e76f51" },
		{ category: "Transportation", color: "#f4a261" },
		{ category: "Shopping", color: "#e9c46a" },
		{ category: "Dating", color: "#2a9d8f" },
		{ category: "Test", color: "#264653" },
	];
	const months: { num: number; name: string }[] = [
		{ num: 1, name: "January" },
		{ num: 2, name: "February" },
		{ num: 3, name: "March" },
		{ num: 4, name: "April" },
		{ num: 5, name: "May" },
		{ num: 6, name: "June" },
		{ num: 7, name: "July" },
		{ num: 8, name: "August" },
		{ num: 9, name: "September" },
		{ num: 10, name: "October" },
		{ num: 11, name: "November" },
		{ num: 12, name: "December" },
	];

	const { data: sessionData } = useSession();
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
	const getUser = trpc.useQuery([
		"user.byEmail",
		{
			email: sessionData?.user ? sessionData?.user?.email : "guest@guest.com",
		},
	]);
	const summariesQuery = trpc.useQuery([
		"transaction.summary-by-month",
		{
			userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s",
			month: currentMonth,
		},
	]);
	const totalQuery = trpc.useQuery([
		"transaction.total-spent",
		{
			userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s",
			month: currentMonth,
		},
	]);
	summariesQuery.data?.map((x) => {
		data.push({
			category: x.category,
			color: categories.filter((color) => {
				return color.category == x.category;
			})[0].color,
			amount: x._sum.amount,
		});
	});

	const separator = (numb: any) => {
		var str = numb.toString().split(".");
		str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return str.join(".");
	};

	const calculatePercent = (value: number) => {
		return totalQuery.data
			? totalQuery.data?._sum.amount
				? Number((100 * value) / totalQuery.data._sum.amount).toFixed(2)
				: 0
			: 0;
	};

	const [title, setTitle] = useState("Transaction Summary July 2022");

	/**
	 * TODO:
	 * 1. Do we create helper function or, put in database
	 */

	return (
		<>
			<MoneyTrackLayout></MoneyTrackLayout>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body gap-5 items-stretch">
					<div className="form-control w-1/2 mx-auto">
						<select
							className="select select-bordered"
							defaultValue={currentMonth}
							onChange={(e) => {
								setCurrentMonth(Number(e.target.value));
								setTitle(
									`Transaction Summary ${
										months.filter((x) => {
											return x.num == Number(e.target.value);
										})[0].name
									} ${new Date().getFullYear()}`
								);
							}}
						>
							<option>Select Category</option>
							{months.map(({ num, name }) => (
								<option key={num} value={num}>
									{name}
								</option>
							))}
						</select>
					</div>
					{data.length !== 0 ? (
						<>
							<Doughnut title={title} data={data} />
							<div className="overflow-x-auto">
								<table className="table table-auto table-zebra w-full">
									<thead>
										<tr>
											<th></th>
											<th>Category</th>
											<th>Amount</th>
											<th>Percent</th>
										</tr>
									</thead>
									<tbody>
										{data.map((data, index) => (
											<tr key={index}>
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
												<td className="text-error font-semibold">
													-RM {separator(data.amount.toFixed(2))}
												</td>
												<td>{calculatePercent(data.amount)} %</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</>
					) : (
						<div className="flex flex-col items-center pt-5 gap-5 text-center">
							<RiEmotionSadLine size={100} className="text-error" />
							<h1 className="text-2xl text-error">
								There is no transaction for this month.
							</h1>
							<span>
								You can add a transaction from the{" "}
								<kbd className="kbd">Transactions</kbd> tab
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
