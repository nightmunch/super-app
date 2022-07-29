import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Alert } from "../../components/Alert";
import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";

export default function Transactions() {
	const [isAlert, setIsAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");
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
						<div className="overflow-x-auto pt-2 ">
							<table className="table table-auto table-zebra w-full">
								<thead>
									<tr>
										<td></td>
										<td>Item</td>
										<td>Category</td>
										<td>Remarks</td>
										<td>Date</td>
										<td>Action</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Item New 1</td>
										<td>Category 1</td>
										<td>Remarks 2</td>
										<td>29/07/2022</td>
										<td className="text-center">
											<div className="tooltip" data-tip="Remove Transaction">
												<label htmlFor="my-modal2" className="btn btn-ghost">
													<FaTrash />
												</label>
											</div>
										</td>
									</tr>
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
									<span className="label-text">Expense</span>
								</label>
								<input
									type="text"
									placeholder="Ex: Mekdi"
									className="input input-bordered w-full"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Category</span>
								</label>
								<select className="select select-bordered">
									<option selected>Select Category</option>
									<option>Food & Beverages</option>
									<option>Transportation</option>
									<option>Shopping</option>
									<option>Dating</option>
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
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Date</span>
								</label>
								<input type="date" className="input input-bordered w-full" />
							</div>
							<label htmlFor="my-modal" className="btn btn-primary">
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
							<label htmlFor="my-modal2" className="btn btn-error">
								Delete
							</label>
						</div>
					</div>
				</label>
			</MoneyTrackLayout>
		</>
	);
}
