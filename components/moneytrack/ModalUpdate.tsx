import { Dispatch } from "react";
import toast from "react-hot-toast";
import {
	ClaimAction,
	ClaimActionKind,
	ClaimState,
} from "../../hooks/useClaimReducer";
import { trpc } from "../../utils/trpc";

export const ModalUpdate = ({
	htmlfor,
	state,
	dispatch,
}: {
	htmlfor: string;
	state: ClaimState;
	dispatch: Dispatch<ClaimAction>;
}) => {
	const utils = trpc.useContext();
	const updateClaim = trpc.useMutation("claim.update", {
		async onSuccess() {
			// refetches posts after a post is adjusted
			await utils.invalidateQueries(["claim.all"]);
			await utils.invalidateQueries(["claim.sum"]);
		},
	});

	const editClaim = async () => {
		const input = {
			id: state.id,
			data: {
				item: state.item,
				amount: Number(state.amount),
				date: state.date,
			},
		};

		try {
			await updateClaim.mutateAsync(input);
			// Reset field if success
			dispatch({ type: ClaimActionKind.SET_ID, payload: "" });
			dispatch({ type: ClaimActionKind.SET_ITEM, payload: "" });
			dispatch({ type: ClaimActionKind.SET_AMOUNT, payload: "" });
			dispatch({ type: ClaimActionKind.SET_DATE, payload: new Date() });

			toast.success("Claim has successfully updated!");
		} catch {}
	};

	return (
		<>
			<input type="checkbox" id={htmlfor} className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor={htmlfor}
						className="btn btn-sm btn-circle absolute right-3 top-3"
					>
						✕
					</label>
					<div className="flex flex-col gap-5">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Item</span>
							</label>
							<input
								type="text"
								placeholder="Ex: Mekdi"
								className="input input-bordered w-full"
								value={state.item}
								onChange={(e) => {
									dispatch({
										type: ClaimActionKind.SET_ITEM,
										payload: e.target.value,
									});
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
								value={state.amount}
								onChange={(e) => {
									const re = /^[\d]*\.?[\d]{0,2}$/;
									if (re.test(e.target.value)) {
										dispatch({
											type: ClaimActionKind.SET_AMOUNT,
											payload: e.target.value,
										});
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
								value={state.date.toISOString().substring(0, 10)}
								className="input input-bordered w-full"
								onChange={(e) => {
									dispatch({
										type: ClaimActionKind.SET_DATE,
										payload: new Date(e.target.value),
									});
								}}
							/>
						</div>
						<label
							htmlFor={htmlfor}
							className="btn btn-primary"
							onClick={(e) => {
								editClaim();
							}}
						>
							Update
						</label>
					</div>
				</div>
			</div>
		</>
	);
};
