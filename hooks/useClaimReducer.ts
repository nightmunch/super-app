import { useReducer } from "react";

export enum ClaimActionKind {
	SET_ID = "id",
	SET_ITEM = "item",
	SET_AMOUNT = "amount",
	SET_DATE = "date",
	SET_REMOVE = "remove",
}

// An interface for our actions
export interface ClaimAction {
	type: ClaimActionKind;
	payload: string | Date;
}

// An interface for our state
export interface ClaimState {
	id: string;
	item: string;
	amount: string;
	date: Date;
	remove: string;
}

export function useClaimReducer() {
	// initial state of the database
	const initialState = {
		id: "",
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
