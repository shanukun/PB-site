import React from 'react';

export const Store = React.createContext();

const initialState = {
	credentials: []
}

function reducer(state, action) {
	switch(action.type) {
		case 'FETCH':
			return { state: [], credentials: action.payload };
		default:
			return state;
	}
}

export function StoreProvider(props) {
	const [state, dispatch] = React.useContext(reducer, initialState);
	const value = { state, dispatch };
	return (
		<Store.Provider value={value}>
			{props.children}
		</Store.Provider>
	);
}