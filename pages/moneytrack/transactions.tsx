import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Alert } from "../../components/Alert";
import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { Transactions as Trans } from "@prisma/client";

export default function Transactions() {
	const { data: sessionData } = useSession();
	const utils = trpc.useContext();

	const [isAlert, setIsAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");
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
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

	const getUser = trpc.useQuery([
		"user.byEmail",
		{
			email: sessionData?.user ? sessionData?.user?.email : "guest@guest.com",
		},
	]);

	const transactionsQuery = trpc.useQuery([
		"transaction.list-by-month",
		{
			userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s",
			month: currentMonth,
		},
	]);

	const createTransaction = trpc.useMutation("transaction.create", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["transaction.list-by-month"]);
		},
	});

	const deleteTransaction = trpc.useMutation("transaction.delete", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["transaction.list-by-month"]);
		},
	});

	const padTo2Digits = (num: number) => {
		return num.toString().padStart(2, "0");
	};

	const formatDate = (date: Date) => {
		return [
			padTo2Digits(date.getDate()),
			padTo2Digits(date.getMonth() + 1),
			date.getFullYear(),
		].join("/");
	};

	const separator = (numb: any) => {
		var str = numb.toString().split(".");
		str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return str.join(".");
	};

	const [item, setItem] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [remarks, setRemarks] = useState("");
	const [date, setDate] = useState<Date>(new Date());
	const [remove, setRemove] = useState("");

	const addTransaction = async () => {
		if (getUser?.data) {
			const input = {
				item: item,
				amount: Number(amount),
				category: category,
				remarks: remarks,
				date: date,
				userId: getUser.data.id,
			};
			try {
				await createTransaction.mutateAsync(input);
				// Reset field if success
				setItem("");
				setAmount("");
				setCategory("");
				setRemarks("");
				setDate(new Date());
				// alert
				setIsAlert(true);
				setMessage("Transaction is succesfully added!");
				setType("success");
			} catch {}
		} else {
			console.log("No user data");
		}
	};

	const removeTransaction = async (id: string) => {
		const input = {
			id: id,
		};
		try {
			await deleteTransaction.mutateAsync(input);
			// alert
			setIsAlert(true);
			setMessage("Transaction is succesfully deleted!");
			setType("error");
		} catch {}
	};

	const onDisplay = (item: Trans) => {
		setItem(item.item);
		setAmount(String(item.amount));
		setCategory(item.category);
		setRemarks(item.remarks ? item.remarks : "");
		setDate(item.date);
	};

	const offDisplay = () => {
		setItem("");
		setAmount("");
		setCategory("");
		setRemarks("");
		setDate(new Date());
	};

	return (
		<>
			<MoneyTrackLayout>
				<Alert
					message={message}
					isAlert={isAlert}
					setIsAlert={setIsAlert}
					type={type}
				/>
				<div className="card bg-neutral shadow-xl text-neutral-content">
					<div className="card-body">
						<div className="flex flex-col gap-2">
							<div className="flex flex-row justify-between items-center px-3">
								<h1 className="text-xl font-semibold text-primary">
									Transactions
								</h1>
								<div className="tooltip" data-tip="Add Transaction">
									<label htmlFor="my-modal" className="btn btn-ghost">
										<FaPlus />
									</label>
								</div>
							</div>
						</div>
						<div className="form-control w-1/2">
							<select
								className="select select-bordered"
								defaultValue={currentMonth}
								onChange={(e) => {
									setCurrentMonth(Number(e.target.value));
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
						<div className="overflow-x-auto pt-2 ">
							<table className="table table-auto table-zebra w-full">
								<thead>
									<tr>
										<td></td>
										<td>Item</td>
										<td>Amount</td>
										<td>Date</td>
										<td>Action</td>
									</tr>
								</thead>
								<tbody>
									{transactionsQuery.isLoading ? (
										<tr>
											<td colSpan={6} className="text-center">
												<div className="inline-flex items-center">
													<svg
														className="animate-spin mr-3 h-5 w-5 text-white"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													Loading...
												</div>
											</td>
										</tr>
									) : (
										""
									)}
									{transactionsQuery.data?.length === 0 ? (
										<tr>
											<td colSpan={6} className="text-center">
												<small>No Transaction Founds</small>
											</td>
										</tr>
									) : (
										transactionsQuery.data?.map((item, index) => (
											<tr key={item.id}>
												<th>{index + 1}</th>
												<td>
													<label
														htmlFor="display-transaction"
														onClick={() => {
															onDisplay(item);
														}}
													>
														<div className="block pb-1">{item.item}</div>
														<div className=" block badge badge-info text-xs">
															{item.category}
														</div>
														<div className="block">
															<small className="text-primary">
																{item.remarks}
															</small>
														</div>
													</label>
												</td>
												<td className="text-error font-semibold">
													-RM {separator(item.amount.toFixed(2))}
												</td>
												<td>{formatDate(item.date)}</td>
												<td className="text-center">
													<div
														className="tooltip"
														data-tip="Remove Transaction"
													>
														<label
															htmlFor="my-modal2"
															className="btn btn-ghost"
															onClick={(e) => {
																setRemove(item.id);
															}}
														>
															<FaTrash />
														</label>
													</div>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<input type="checkbox" id="my-modal" className="modal-toggle" />
				<label htmlFor="my-modal" className="modal cursor-pointer">
					<label className="modal-box relative" htmlFor="">
						<h1 className="text-xl font-semibold text-primary">
							Add Transactions
						</h1>
						<div className="divider"></div>
						<div className="flex flex-col gap-5">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Amount (RM)</span>
								</label>
								<input
									type="text"
									placeholder="Ex: 10.00"
									className="input input-bordered w-full"
									value={amount}
									onChange={(e) => {
										const re = /^[\d]*\.?[\d]{0,2}$/;
										if (re.test(e.target.value)) {
											setAmount(e.target.value);
										}
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Expense</span>
								</label>
								<input
									type="text"
									placeholder="Ex: Mekdi"
									className="input input-bordered w-full"
									value={item}
									onChange={(e) => {
										setItem(e.target.value);
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Category</span>
								</label>
								<select
									className="select select-bordered"
									defaultValue={category}
									onChange={(e) => {
										setCategory(e.target.value);
									}}
								>
									<option value="">Select Category</option>
									<option value="Food & Beverages">Food & Beverages</option>
									<option value="Transportation">Transportation</option>
									<option value="Shopping">Shopping</option>
									<option value="Dating">Dating</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Remarks</span>
								</label>
								<input
									type="text"
									placeholder="Ex: Noice food"
									className="input input-bordered w-full"
									value={remarks}
									onChange={(e) => {
										setRemarks(e.target.value);
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Date</span>
								</label>
								<input
									type="date"
									className="input input-bordered w-full"
									value={date.toISOString().substring(0, 10)}
									onChange={(e) => {
										setDate(new Date(e.target.value));
									}}
								/>
							</div>
							<label
								htmlFor="my-modal"
								className="btn btn-primary"
								onClick={(e) => {
									addTransaction();
								}}
							>
								Add
							</label>
						</div>
					</label>
				</label>
				<input type="checkbox" id="my-modal2" className="modal-toggle" />
				<label htmlFor="my-modal2" className="modal cursor-pointer">
					<div className="modal-box">
						<div className="modal-action m-5 flex-col items-center gap-5">
							<BiErrorCircle size={100} className="text-error" />
							<h1 className="text-2xl text-error">Delete this transaction?</h1>
							<span>Are you sure you want to delete this transaction?</span>
							<label
								htmlFor="my-modal2"
								className="btn btn-error"
								onClick={(e) => {
									removeTransaction(remove);
								}}
							>
								Delete
							</label>
						</div>
					</div>
				</label>
				<input
					type="checkbox"
					id="display-transaction"
					className="modal-toggle"
				/>
				<div className="modal">
					<div className="modal-box relative">
						<label
							htmlFor="display-transaction"
							className="btn btn-sm btn-circle absolute right-3 top-3"
							onClick={() => {
								offDisplay();
							}}
						>
							✕
						</label>
						<h1 className="text-2xl text-primary text-center">{item}</h1>
						<div className="block badge badge-info text-xs mx-auto mt-3">
							{category}
						</div>
						<div className="divider"></div>
						<h1 className="text-2xl font-bold text-error text-center">
							Cost: -RM {amount}
						</h1>
						<h1 className="text-md pt-3 text-center">{remarks}</h1>
					</div>
				</div>
			</MoneyTrackLayout>
		</>
	);
}
