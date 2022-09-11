import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { Alert } from "../../components/Alert";

import { MoneyTrackLayout } from "../../components/MoneyTrackLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ModalRemove } from "../../components/moneytrack/ModalRemove";
import { ClaimRows } from "../../components/moneytrack/ClaimRows";
import { ModalAdd } from "../../components/moneytrack/ModalAdd";

export default function Claim() {
	const { data: sessionData } = useSession();

	const getUser = trpc.useQuery(
		[
			"user.byEmail",
			{
				email: sessionData?.user ? sessionData?.user?.email : "guest@guest.com",
			},
		],
		{ staleTime: Infinity }
	);

	const userId = getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s";

	const claimsQuery = trpc.useQuery(["claim.all", { userId }], {
		staleTime: Infinity,
	});

	const [item, setItem] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState<Date>(new Date());

	const [message, setMessage] = useState("");
	const [type, setType] = useState("");
	const [remove, setRemove] = useState("");

	const [parent] = useAutoAnimate<HTMLTableSectionElement>();

	return (
		<>
			<MoneyTrackLayout>
				<Alert message={message} setMessage={setMessage} type={type} />
				<div className="card bg-neutral shadow-xl text-neutral-content">
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
										<ClaimRows userId={userId} setRemove={setRemove} />
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<ModalAdd
					htmlfor={"add-claim"}
					userId={userId}
					item={item}
					setItem={setItem}
					amount={amount}
					setAmount={setAmount}
					date={date}
					setDate={setDate}
					setMessage={setMessage}
					setType={setType}
					errorMessage={""}
				/>
				<ModalRemove
					htmlfor="remove-claim"
					title="Delete this claim?"
					description="Are you sure you want to delete this claim?"
					buttonTitle="Remove Claim"
					id={remove}
					userId={userId}
					setMessage={setMessage}
					setType={setType}
					errorMessage={"Claim is successfully deleted!"}
				/>
				<ModalRemove
					htmlfor="remove-all"
					title="Claim All?"
					description="Are you sure you want to claim all entries?"
					buttonTitle="Claim All"
					id={null}
					userId={userId}
					setMessage={setMessage}
					setType={setType}
					errorMessage={"All item has successfully claimed"}
				/>
			</MoneyTrackLayout>
		</>
	);
}
