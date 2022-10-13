import { FaPlus } from "react-icons/fa";
import { trpc } from "../../utils/trpc";

import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ModalRemove } from "../../components/moneytrack/ModalRemove";
import { ClaimRows } from "../../components/moneytrack/ClaimRows";
import { ModalAdd } from "../../components/moneytrack/ModalAdd";
import { useClaimReducer } from "../../hooks/useClaimReducer";
import { useGetUser } from "../../hooks/useGetUser";

export default function Claim() {
	const userId = useGetUser();

	const claimsQuery = trpc.useQuery(["claim.all", { userId }], {
		staleTime: Infinity,
	});

	const [parent] = useAutoAnimate<HTMLTableSectionElement>();

	const [state, dispatch] = useClaimReducer();

	return (
		<>
			<MoneyTrackLayout>
				<div className="card bg-neutral  text-neutral-content">
					<div className="card-body">
						<div className="flex flex-col gap-2">
							<div className="flex flex-row justify-between items-center px-3">
								<h1 className="text-xl font-semibold text-primary">
									Claim List
								</h1>
								<div className="flex gap-2">
									<div className="tooltip" data-tip="Claim All">
										<label
											htmlFor="remove-all"
											className={`btn ${
												claimsQuery.data?.length == 0
													? "btn-disabled"
													: "btn-success"
											}`}
										>
											Claim All
										</label>
									</div>
									<div className="tooltip" data-tip="Add Claim">
										<label htmlFor="add-claim" className="btn btn-ghost">
											<FaPlus />
										</label>
									</div>
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
									<tbody ref={parent}>
										<ClaimRows userId={userId} dispatch={dispatch} />
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<ModalAdd
					htmlfor={"add-claim"}
					userId={userId}
					alertMessage={"Claim has successfully added!"}
					state={state}
					dispatch={dispatch}
				/>
				<ModalRemove
					htmlfor="remove-claim"
					title="Delete this claim?"
					description="Are you sure you want to delete this claim?"
					buttonTitle="Remove Claim"
					id={state.remove}
					userId={userId}
					alertMessage={"Claim is successfully deleted!"}
				/>
				<ModalRemove
					htmlfor="remove-all"
					title="Claim All?"
					description="Are you sure you want to claim all entries?"
					buttonTitle="Claim All"
					id={null}
					userId={userId}
					alertMessage={"All item has successfully claimed"}
				/>
			</MoneyTrackLayout>
		</>
	);
}
