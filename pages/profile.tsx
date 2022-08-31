import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Alert } from "../components/Alert";
import { trpc } from "../utils/trpc";

export default function Profile() {
	const { data: sessionData } = useSession();
	const [name, setName] = useState(sessionData?.user.name);

	const [isAlert, setIsAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");

	const mutateName = trpc.useMutation("user.changeName", {
		async onSuccess() {
			// Refresh session
			const event = new Event("visibilitychange");
			document.dispatchEvent(event);
			// Alert
			setMessage("Your name has succesfully changed!");
			setType("success");
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
			<div className="card bg-neutral shadow-xl text-neutral-content">
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
			<Alert message={message} setMessage={setMessage} type={type} />
		</>
	);
}
