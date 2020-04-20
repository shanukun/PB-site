import React from 'react';
import { Store } from './Store';

const API = "http://localhost:8000/api/getpass";

const ShowBtn = (props) => {
	const [show, setShow] = React.useState(false);
	const handleClick = () => {
		setShow(!show);
		props.togglePass(props.id);
	}
	return (
		<button type="button" onClick={handleClick}>
			{ show ? "Hide" : "Show" }
		</button>
	);
}

function Display(props) {
	const { state } = React.useContext(Store);
	const [passState, setPassState] = React.useState({});

	const togglePass = (id) => {
		if (passState.hasOwnProperty(id)) {
			if (passState[id]['show'] === true) {
				changePassList(id, false);
			} else {
				changePassList(id, true);
			}
		} else {
			fetchPassword(id);
		}
	}

	const changePassList = (id, showState) => {
		setPassState(passState => ({
			...passState,
			[id]: {
				...passState[id],
				show: showState
			}
		}));
	}

	const fetchPassword = async (id) => {
		const data = await fetch(API, {
			method: 'POST',
			body: JSON.stringify({ "key" : props.pass,
								   "cred_id": id })
		});
		const dataJson = await data.json();
		addPassToList(id, dataJson.password);
	}

	const addPassToList = (id, pass) => {
		const passObject = {pass: pass, show: true};
		setPassState(passState => ({
			...passState,
			[id]: passObject
		}));
	}

	return (
		<React.Fragment>
			{ state.credentials.map((cred) => {
				return (
					<div>
						<div>
							<div>
								<div><strong>{cred.domain}</strong></div>
								<div>{cred.username}</div>
								{/* <div>{ cred.password }</div> */}
								<div>
									{ passState.hasOwnProperty(cred.cred_id) ? 
											passState[cred.cred_id]['show'] === true ? 
												passState[cred.cred_id]['pass'] : 
												cred.password : 
											cred.password 
									}
								</div>
								<div>
									<ShowBtn id={cred.cred_id} togglePass={togglePass} />
								</div>
								<div>
									<button type="button">
										Copy
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</React.Fragment>
	);
}

export default Display;