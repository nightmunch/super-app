import { Dispatch } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { formatDate, separator } from "../../helpers/helpers";
import { trpc } from "../../utils/trpc";

type Props = {
	userId: string;
	dispatch: Dispatch<any>;
};

export const ClaimRows = ({ userId, dispatch }: Props) => {
	const claimsQuery = trpc.useQuery(["claim.all", { userId }], {
		staleTime: Infinity,
	});

	const sumQuery = trpc.useQuery(["claim.sum", { userId }], {
		staleTime: Infinity,
	});

	return (
		<>
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
				<></>
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
									htmlFor="remove-claim"
									className="btn btn-ghost"
									onClick={(e) => {
										dispatch({ type: "remove", payload: item.id });
										// setRemove(item.id);
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
						RM {separator(sumQuery.data._sum.amount.toFixed(2))}
					</th>
					<th></th>
					<th></th>
				</tr>
			) : (
				<></>
			)}
		</>
	);
};
