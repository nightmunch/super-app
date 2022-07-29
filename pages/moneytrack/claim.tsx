import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { Alert } from "../../components/Alert";

import React from "react";
import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";

export default function Claim() {
	const { data: sessionData } = useSession();

	const utils = trpc.useContext();

	const getUser = trpc.useQuery([
		"user.byEmail",
		{
			email: sessionData?.user ? sessionData?.user?.email : "guest@guest.com",
		},
	]);

	const claimsQuery = trpc.useQuery([
		"claim.all",
		{ userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s" },
	]);

	const sumQuery = trpc.useQuery([
		"claim.sum",
		{ userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s" },
	]);

	const createClaim = trpc.useMutation("claim.create", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["claim.all"]);
			await utils.invalidateQueries(["claim.sum"]);
		},
	});

	const deleteClaim = trpc.useMutation("claim.delete", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["claim.all"]);
			await utils.invalidateQueries(["claim.sum"]);
		},
	});

	const [item, setItem] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState<Date>(new Date());
	const [isAlert, setIsAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");
	const [remove, setRemove] = useState("");

	const addClaim = async () => {
		if (getUser?.data) {
			const input = {
				item: item,
				amount: Number(amount),
				date: date,
				userId: getUser.data.id,
			};
			try {
				await createClaim.mutateAsync(input);
				// Reset field if success
				setItem("");
				setAmount("");
				setDate(new Date());
				// alert
				setIsAlert(true);
				setMessage("Claim is succesfully added!");
				setType("success");
			} catch {}
		} else {
			console.log("No user data");
		}
	};

	const removeClaim = async (id: string) => {
		const input = {
			id: id,
		};
		try {
			await deleteClaim.mutateAsync(input);
			// alert
			setIsAlert(true);
			setMessage("Claim is succesfully deleted!");
			setType("error");
		} catch {}
	};

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
									Claim List
								</h1>
								<div className="tooltip" data-tip="Add Claim">
									<label htmlFor="my-modal" className="btn btn-ghost">
										<FaPlus />
									</label>
								</div>
							</div>
							<div className="overflow-x-auto pt-2 ">
								<table className="table table-auto table-zebra w-full">
									<thead>
										<tr>
											<th></th>
											<th>Item</th>
											<th>Amount</th>
											<th>Date</th>
											<th className="text-center">Action</th>
										</tr>
									</thead>
									<tbody>
										{claimsQuery.isLoading ? (
											<tr>
												<td colSpan={5} className="text-center">
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
										{claimsQuery.data?.length === 0 ? (
											<tr>
												<td colSpan={5} className="text-center">
													<small>
														Press{" "}
														<kbd className="kbd">
															<FaPlus />
														</kbd>{" "}
														to add one.
													</small>
												</td>
											</tr>
										) : (
											claimsQuery.data?.map((item, index) => (
												<tr key={item.id}>
													<th>{index + 1}</th>
													<td>{item.item}</td>
													<td>RM {separator(item.amount.toFixed(2))}</td>
													<td>{formatDate(item.date)}</td>
													<td className="text-center">
														<div className="tooltip" data-tip="Remove Claim">
															<label
																htmlFor="my-modal2"
																className="btn btn-ghost"
																onClick={(e) => {
																	// removeClaim(item.id);
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
										{sumQuery.data?._sum.amount ? (
											<tr>
												<th></th>
												<th className="text-primary">Total</th>
												<th className="text-primary">
													RM{separator(sumQuery.data._sum.amount.toFixed(2))}
												</th>
												<th></th>
												<th></th>
											</tr>
										) : (
											<></>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<input type="checkbox" id="my-modal" className="modal-toggle" />
				<label htmlFor="my-modal" className="modal cursor-pointer">
					<label className="modal-box relative" htmlFor="">
						<h1 className="text-xl font-semibold text-primary">Add Claim</h1>
						<div className="divider"></div>
						<div className="flex flex-col gap-5">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Item</span>
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
									<span className="label-text">Amount (RM)</span>
								</label>
								<input
									type="text"
									placeholder="Ex: 100.50"
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
									<span className="label-text">Date</span>
								</label>
								<input
									type="date"
									value={date.toISOString().substring(0, 10)}
									className="input input-bordered w-full"
									onChange={(e) => {
										setDate(new Date(e.target.value));
									}}
								/>
							</div>
							<label
								htmlFor="my-modal"
								className="btn btn-primary"
								onClick={(e) => {
									addClaim();
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
							<h1 className="text-2xl text-error">Delete this claim?</h1>
							<span>Are you sure you want to delete this claim?</span>
							<label
								htmlFor="my-modal2"
								className="btn btn-error"
								onClick={(e) => {
									removeClaim(remove);
								}}
							>
								Delete
							</label>
						</div>
					</div>
				</label>
			</MoneyTrackLayout>
		</>
	);
}
