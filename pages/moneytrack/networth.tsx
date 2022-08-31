import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { Alert } from "../../components/Alert";

import React from "react";
import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";
import { separator } from "../../helpers/helpers";
import { NetWorth as NW } from "@prisma/client";
import { copyFileSync } from "fs";

/**
 * TODO:
 * [x] create api to get the current ETH value
 * [x] create array of empty price, after useEffect, fill it with currentPrice.
 * [x] all query fetch once.
 */

export default function NetWorth() {
	const { data: sessionData } = useSession();

	const utils = trpc.useContext();

	const [price, setPrice] = useState({ eth: 0 });
	const getCryptoPrice = trpc.useQuery(
		[
			"networth.cryptoprice",
			{
				crypto: "ethereum",
			},
		],
		{
			onSuccess: ({ data }) => {
				setPrice((price) => ({
					...price,
					...{ eth: data },
				}));
			},
		}
	);

	const getUser = trpc.useQuery(
		[
			"user.byEmail",
			{
				email: sessionData?.user ? sessionData?.user?.email : "guest@guest.com",
			},
		],
		{ staleTime: Infinity }
	);

	const netWorthQuery = trpc.useQuery(
		[
			"networth.all",
			{ userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s" },
		],
		{ staleTime: Infinity }
	);

	const sumNetWorth = trpc.useQuery(
		[
			"networth.sum",
			{ userId: getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s" },
		],
		{ staleTime: Infinity }
	);

	const calculateSum = () => {
		var notRM = 0;
		netWorthQuery.data?.map((net) => {
			net.currency != "RM" ? (notRM += net.amount * price.eth) : "";
		});
		return sumNetWorth.data?._sum.amount! + notRM;
	};

	const createNetWorth = trpc.useMutation("networth.create", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["networth.all"]);
			await utils.invalidateQueries(["networth.sum"]);
		},
	});

	const updateNetWorth = trpc.useMutation("networth.update", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["networth.all"]);
			await utils.invalidateQueries(["networth.sum"]);
		},
	});

	const deleteNetWorth = trpc.useMutation("networth.delete", {
		async onSuccess() {
			// refetches posts after a post is added
			await utils.invalidateQueries(["networth.all"]);
			await utils.invalidateQueries(["networth.sum"]);
		},
	});

	const [id, setID] = useState("");
	const [item, setItem] = useState("");
	const [amount, setAmount] = useState("");
	const [currency, setCurrency] = useState("RM");
	const [category, setCategory] = useState("");
	const [remarks, setRemarks] = useState("");

	const [message, setMessage] = useState("");
	const [type, setType] = useState("");

	const [remove, setRemove] = useState("");

	const addNetWorth = async () => {
		if (getUser?.data) {
			const input = {
				item: item,
				category: category,
				amount: Number(amount),
				currency: currency,
				remarks: remarks,
				userId: getUser.data.id,
			};
			try {
				await createNetWorth.mutateAsync(input);
				// Reset field if success
				setItem("");
				setAmount("");
				setCategory("");
				setRemarks("");
				// Alert
				setMessage("Net Worth is succesfully added!");
				setType("success");
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("No user data");
		}
	};

	const editNetWorth = async () => {
		if (getUser?.data) {
			const input = {
				id: id,
				data: {
					item: item,
					category: category,
					amount: Number(amount),
					currency: currency,
					remarks: remarks,
					userId: getUser.data.id,
				},
			};
			try {
				await updateNetWorth.mutateAsync(input);
				// Reset field if success
				setItem("");
				setAmount("");
				setCategory("");
				setRemarks("");
				// Alert
				setMessage("Net Worth is succesfully updated!");
				setType("success");
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("No user data");
		}
	};

	const removeNetWorth = async (id: string) => {
		const input = {
			id: id,
		};
		try {
			await deleteNetWorth.mutateAsync(input);
			// Alert
			setMessage("Net is succesfully deleted!");
			setType("error");
		} catch {}
	};

	const onDisplay = (item: NW) => {
		setID(item.id);
		setItem(item.item);
		setAmount(String(item.amount));
		setCategory(item.category);
		setRemarks(item.remarks ? item.remarks : "");
	};

	const offDisplay = () => {
		setItem("");
		setAmount("");
		setCategory("");
		setRemarks("");
	};

	return (
		<>
			<MoneyTrackLayout>
				<Alert message={message} setMessage={setMessage} type={type} />
				<div className="card bg-neutral shadow-xl text-neutral-content">
					<div className="card-body">
						<div className="flex flex-col gap-2">
							<div className="flex flex-row justify-between items-center px-3">
								<h1 className="text-xl font-semibold text-primary">
									Net Worth
								</h1>
								<div className="tooltip" data-tip="Add Net Worth">
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
											<th>Bank / Investment</th>
											<th>Amount</th>
											<th>Remarks</th>
											<th className="text-center">Action</th>
										</tr>
									</thead>
									<tbody>
										{netWorthQuery.data?.length === 0 ? (
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
											netWorthQuery.data?.map((item, index) => (
												<tr key={item.id}>
													<td>{index + 1}</td>
													<td>
														<label
															htmlFor="display-transaction"
															onClick={() => {
																onDisplay(item);
															}}
														>
															{item.item}
														</label>
													</td>
													<td>
														{item.currency == "RM"
															? `RM ${separator(item.amount.toFixed(2))}`
															: `RM ${separator(
																	(item.amount * price.eth).toFixed(2)
															  )}`}
													</td>
													<td>{item.remarks}</td>
													<td className="text-center">
														<div
															className="tooltip"
															data-tip="Remove Net Worth"
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
										{sumNetWorth.data?._sum.amount ? (
											<tr>
												<th></th>
												<th className="text-primary">Total</th>
												<th className="text-primary">
													RM {separator(calculateSum().toFixed(2))}
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
						<h1 className="text-xl font-semibold text-primary">
							Add Net Worth
						</h1>
						<div className="divider"></div>
						<div className="flex flex-col gap-5">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Bank / Investment</span>
								</label>
								<input
									type="text"
									placeholder="Ex: Bank Islam"
									className="input input-bordered w-full"
									value={item}
									onChange={(e) => {
										setItem(e.target.value);
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Amount</span>
								</label>
								<input
									type="text"
									placeholder="Ex: 100.50"
									className="input input-bordered w-full"
									value={amount}
									onChange={(e) => {
										const re = /^[\d]*\.?[\d]{0,3}$/;
										if (re.test(e.target.value)) {
											setAmount(e.target.value);
										}
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Currency</span>
								</label>
								<select
									className="select select-bordered w-full"
									onChange={(e) => {
										setCurrency(e.target.value);
									}}
									value={currency}
								>
									<option value="RM">RM</option>
									<option value="ETH">ETH</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Category</span>
								</label>
								<select
									className="select select-bordered w-full"
									onChange={(e) => {
										setCategory(e.target.value);
									}}
									value={category}
								>
									<option disabled>Select Category</option>
									<option value="Bank">Bank</option>
									<option value="Investment">Investment</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Remarks</span>
								</label>
								<input
									type="text"
									placeholder="Ex: To the moon!"
									className="input input-bordered w-full"
									value={remarks}
									onChange={(e) => {
										setRemarks(e.target.value);
									}}
								/>
							</div>
							<label
								htmlFor="my-modal"
								className="btn btn-primary"
								onClick={(e) => {
									addNetWorth();
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
							<h1 className="text-2xl text-error">Delete this net worth?</h1>
							<span>Are you sure you want to delete this net worth?</span>
							<label
								htmlFor="my-modal2"
								className="btn btn-error"
								onClick={(e) => {
									removeNetWorth(remove);
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
						<div className="flex flex-col gap-5">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Bank / Investment</span>
								</label>
								<input
									type="text"
									placeholder="Ex: Bank Islam"
									className="input input-bordered w-full"
									value={item}
									onChange={(e) => {
										setItem(e.target.value);
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Amount</span>
								</label>
								<input
									type="text"
									placeholder="Ex: 100.50"
									className="input input-bordered w-full"
									value={amount}
									onChange={(e) => {
										const re = /^[\d]*\.?[\d]{0,3}$/;
										if (re.test(e.target.value)) {
											setAmount(e.target.value);
										}
									}}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Currency</span>
								</label>
								<select
									className="select select-bordered w-full"
									onChange={(e) => {
										setCurrency(e.target.value);
									}}
									value={currency}
								>
									<option value="RM">RM</option>
									<option value="ETH">ETH</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Category</span>
								</label>
								<select
									className="select select-bordered w-full"
									onChange={(e) => {
										setCategory(e.target.value);
									}}
									value={category}
								>
									<option disabled>Select Category</option>
									<option value="Bank">Bank</option>
									<option value="Investment">Investment</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Remarks</span>
								</label>
								<input
									type="text"
									placeholder="Ex: To the moon!"
									className="input input-bordered w-full"
									value={remarks}
									onChange={(e) => {
										setRemarks(e.target.value);
									}}
								/>
							</div>
							<label
								htmlFor="display-transaction"
								className="btn btn-primary"
								onClick={(e) => {
									editNetWorth();
								}}
							>
								Add
							</label>
						</div>
					</div>
				</div>
			</MoneyTrackLayout>
		</>
	);
}
