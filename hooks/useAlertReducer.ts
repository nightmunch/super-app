import { useReducer } from "react";

export enum AlertActionKind {
	DEFAULT = "",
	SUCCESS = "success",
	ERROR = "error",
}

export function useAlertReducer() {
	// An interface for our actions
	interface AlertAction {
		type: AlertActionKind;
		message: string;
	}

	// An interface for our state
	interface AlertState {
		type: AlertActionKind;
		message: string;
	}

	// initial state of the database
	const initialState = {
		type: AlertActionKind.DEFAULT,
		message: "",
	};

	function reducer(state: AlertState, action: AlertAction) {
		const { type, message } = action;
		if (type == AlertActionKind.DEFAULT) {
			return {
				type,
				message: "",
			};
		} else {
			return {
				type,
				message,
			};
		}
	}

	return useReducer(reducer, initialState);
}
