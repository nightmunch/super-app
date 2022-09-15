import { useSession } from "next-auth/react";
import { useState } from "react";
import { Alert } from "../components/Alert";
import { useAlertReducer } from "../hooks/useAlertReducer";
import { trpc } from "../utils/trpc";

export default function Profile() {
	const { data: sessionData } = useSession();
	const [name, setName] = useState(sessionData?.user.name);

	const [isAlert, setIsAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");

	const [alertState, alertDispatch] = useAlertReducer();
	enum AlertActionKind {
		SET_MESSAGE = "message",
		SET_TYPE = "type",
	}

	const mutateName = trpc.useMutation("user.changeName", {
		async onSuccess() {
			// Refresh session
			const event = new Event("visibilitychange");
			document.dispatchEvent(event);
			// Alert
			alertDispatch({
				type: AlertActionKind.SET_MESSAGE,
				payload: "Your name has been successfully changed!",
			});
			alertDispatch({ type: AlertActionKind.SET_TYPE, payload: "success" });
		},
	});

	const changeName = async () => {
		const input = {
			email: sessionData?.user.email,
			name: name,
		};
		await mutateName.mutateAsync(input);
	};
	return (
		<>
			<div className="card bg-neutral  text-neutral-content">
				<div className="card-body">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Your Name</span>
						</label>
						<label className="input-group">
							<input
								type="text"
								placeholder="Your Name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
								className="input input-bordered w-full max-w-xs"
							/>
							<button className="btn btn-primary" onClick={() => changeName()}>
								Change Name
							</button>
						</label>
					</div>
				</div>
			</div>
			<Alert state={alertState} dispatch={alertDispatch} />
		</>
	);
}
