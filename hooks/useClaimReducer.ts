import { useReducer } from "react";

export function useClaimReducer() {
	enum ClaimActionKind {
		SET_ITEM = "item",
		SET_AMOUNT = "amount",
		SET_DATE = "date",
		SET_REMOVE = "remove",
	}

	// An interface for our actions
	interface ClaimAction {
		type: ClaimActionKind;
		payload: string | Date;
	}

	// An interface for our state
	interface ClaimState {
		item: string;
		amount: string;
		date: Date;
		remove: string;
	}

	// initial state of the database
	const initialState = {
		item: "",
		amount: "",
		date: new Date(),
		remove: "",
	};

	function reducer(state: ClaimState, action: ClaimAction) {
		const { type, payload } = action;
		return { ...state, [type]: payload };
	}

	return useReducer(reducer, initialState);
}
