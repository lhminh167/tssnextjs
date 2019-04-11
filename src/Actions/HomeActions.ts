import { ActionConsts } from "@Definations";
import { apiCall } from "../Services";

/**
 * ACTIONS
*/
export const HomeActions = {
	Map: payload => ({
		payload,
		type: ActionConsts.Home.SetReducer
	}),

	Reset: () => ({
		type: ActionConsts.Home.ResetReducer
	}),

	FetchValues: () => { 
		return dispatch => {
			apiCall({ method: "GET", path: "/api/values" })
			.then(res => res.json())
			.then(json => {
				dispatch(HomeActions.Map(json));
			})
		}
	}
}
