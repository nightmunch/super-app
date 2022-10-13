import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { trpc } from "../../utils/trpc";

interface ClaimState {
	item: string;
	amount: string;
	date: Date;
}

type Props = {
	htmlfor: string;
	userId: string;
	alertMessage: string;
	dispatch: Dispatch<any>;
	state: ClaimState;
};

export const ModalAdd = ({
	htmlfor,
	userId,
	alertMessage,
	dispatch,
	state,
}: Props) => {
	const utils = trpc.useContext();
	const createClaim = trpc.useMutation("claim.create", {
		async onSuccess() {
			// refetches posts after a post is adjusted
			await utils.invalidateQueries(["claim.all"]);
			await utils.invalidateQueries(["claim.sum"]);
		},
	});
	const addClaim = async () => {
		const input = {
			item: state.item,
			amount: Number(state.amount),
			date: state.date,
			userId,
		};
		try {
			await createClaim.mutateAsync(input);
			// Reset field if success
			dispatch({ type: "item", payload: "" });
			dispatch({ type: "amount", payload: "" });
			dispatch({ type: "date", payload: new Date() });

			toast.success(alertMessage);
		} catch {}
	};
	console.log("test1");
	return (
		<>
			<input type="checkbox" id={htmlfor} className="modal-toggle" />
			<label htmlFor={htmlfor} className="modal cursor-pointer">
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
								value={state.item}
								onChange={(e) => {
									dispatch({ type: "item", payload: e.target.value });
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
										dispatch({ type: "amount", payload: e.target.value });
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
									dispatch({ type: "date", payload: new Date(e.target.value) });
								}}
							/>
						</div>
						<label
							htmlFor={htmlfor}
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
		</>
	);
};
