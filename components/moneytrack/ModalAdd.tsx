import { Dispatch, SetStateAction } from "react";
import { trpc } from "../../utils/trpc";

type Props = {
	htmlfor: string;
	userId: string;
	item: string;
	setItem: Dispatch<SetStateAction<string>>;
	amount: string;
	setAmount: Dispatch<SetStateAction<string>>;
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
	setMessage: Dispatch<SetStateAction<string>>;
	setType: Dispatch<SetStateAction<string>>;
	errorMessage: string;
};

export const ModalAdd = ({
	htmlfor,
	userId,
	item,
	setItem,
	amount,
	setAmount,
	date,
	setDate,
	setMessage,
	setType,
	errorMessage,
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
			item,
			amount: Number(amount),
			date,
			userId,
		};
		try {
			await createClaim.mutateAsync(input);
			// Reset field if success
			setItem("");
			setAmount("");
			setDate(new Date());
			// Alert
			setMessage(errorMessage);
			setType("success");
		} catch {}
	};
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
