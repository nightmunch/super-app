import { Dispatch, SetStateAction } from "react";

// An interface for our state
interface AlertState {
	message: string;
	type: string;
}

type AlertType = {
	dispatch: Dispatch<any>;
	state: AlertState;
};

export const Alert: React.FunctionComponent<AlertType> = ({
	dispatch,
	state,
}) => {
	if (state.type == "success") {
		return (
			<div
				className={`fixed top-20 right-20 z-50 w-1/2 alert alert-success shadow-lg transition-opacity ease-linear ${
					state.message != "" ? "opacity-1" : "opacity-0"
				}`}
				onTransitionEnd={() => {
					setTimeout(() => {
						dispatch({ type: "message", payload: "" });
					}, 5000);
				}}
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{state.message}</span>
				</div>
			</div>
		);
	} else if (state.type == "error") {
		return (
			<div
				className={`fixed top-20 right-20 z-50 w-1/2 alert alert-error shadow-lg transition-opacity ease-linear ${
					state.message != "" ? "opacity-1" : "opacity-0"
				}`}
				onTransitionEnd={() => {
					setTimeout(() => {
						dispatch({ type: "message", payload: "" });
					}, 5000);
				}}
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{state.message}</span>
				</div>
			</div>
		);
	} else {
		return (
			<div
				className={`fixed top-20 right-20 z-50 w-1/2 alert alert-success shadow-lg transition-opacity ease-linear ${
					state.message != "" ? "opacity-1" : "opacity-0"
				}`}
				onTransitionEnd={() => {
					setTimeout(() => {
						dispatch({ type: "message", payload: "" });
					}, 5000);
				}}
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{state.message}</span>
				</div>
			</div>
		);
	}
};
