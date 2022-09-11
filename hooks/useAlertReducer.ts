import { useReducer } from "react";

export function useAlertReducer() {
	enum AlertActionKind {
		SET_MESSAGE = "message",
		SET_TYPE = "type",
	}

	// An interface for our actions
	interface AlertAction {
		type: AlertActionKind;
		payload: string;
	}

	// An interface for our state
	interface AlertState {
		message: string;
		type: string;
	}

	// initial state of the database
	const initialState = {
		message: "",
		type: "",
	};

	function reducer(state: AlertState, action: AlertAction) {
		const { type, payload } = action;
		return { ...state, [type]: payload };
	}

	return useReducer(reducer, initialState);
}
