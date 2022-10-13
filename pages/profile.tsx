import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../utils/trpc";

export default function Profile() {
	const { data: sessionData } = useSession();
	const [name, setName] = useState(sessionData?.user.name);

	const mutateName = trpc.useMutation("user.changeName", {
		async onSuccess() {
			// Refresh session
			const event = new Event("visibilitychange");
			document.dispatchEvent(event);

			toast.success("Your name has been successfully changed!");
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
		</>
	);
}
