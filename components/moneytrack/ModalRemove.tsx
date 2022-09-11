import { BiErrorCircle } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import { Dispatch, SetStateAction } from "react";

type Props = {
	htmlfor: string;
	title: string;
	description: string;
	buttonTitle: string;
	id: string | null;
	userId: string | null;
	setMessage: Dispatch<SetStateAction<string>>;
	setType: Dispatch<SetStateAction<string>>;
	errorMessage: string;
};

export const ModalRemove = ({
	htmlfor,
	title,
	description,
	buttonTitle,
	id,
	userId,
	setMessage,
	setType,
	errorMessage,
}: Props) => {
	const utils = trpc.useContext();

	const deleteClaim = trpc.useMutation(
		id ? "claim.delete" : "claim.delete-all",
		{
			async onSuccess() {
				// refetches posts after a post is adjusted
				await utils.invalidateQueries(["claim.all"]);
				await utils.invalidateQueries(["claim.sum"]);
			},
		}
	);
	const removeObject = async ({ input }: { input: any }) => {
		try {
			await deleteClaim.mutateAsync(input);
			// Alert
			setMessage(errorMessage);
			setType("success");
		} catch {}
	};

	var input = {};
	if (id) {
		input = { id };
	} else {
		input = { userId };
	}
	return (
		<>
			<input type="checkbox" id={htmlfor} className="modal-toggle" />
			<label htmlFor={htmlfor} className="modal cursor-pointer">
				<div className="modal-box">
					<div className="modal-action m-5 flex-col items-center gap-5">
						<BiErrorCircle size={100} className="text-error" />
						<h1 className="text-2xl text-error">{title}</h1>
						<span>{description}</span>
						<label
							htmlFor={htmlfor}
							className="btn btn-error"
							onClick={() => removeObject({ input })}
						>
							{buttonTitle}
						</label>
					</div>
				</div>
			</label>
		</>
	);
};
