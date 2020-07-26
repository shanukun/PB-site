import React from 'react';
import { Store } from './Store';
import './Display.css';

const GoAPI = "http://localhost:8000/api/getpass";

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

const CopyBtn = (props) => {
	const handleClick = () => {
		props.copyPass(props.id);
	}

	return (
		<button type="button" onClick={handleClick}>
			Copy
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

	const copyPass =  async (id) => {
		let pass = '';
		if (passState.hasOwnProperty(id)) {
			pass = passState[id]['pass'];
		} else {
			pass = await fetchPassword(id, false);
		}
		navigator.clipboard.writeText(pass);
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

	const fetchPassword = async (id, show=true) => {
		const data = await fetch(GoAPI, {
			method: 'POST',
			body: JSON.stringify({ "key" : props.pass,
								   "cred_id": id })
		});
		const dataJson = await data.json();
		addPassToList(id, dataJson.password, show);
		return dataJson.password;
	}

	const addPassToList = (id, pass, show) => {
		const passObject = {pass: pass, show: show};
		setPassState(passState => ({
			...passState,
			[id]: passObject
		}));
	}

	return (
		<React.Fragment>
			{ state.credentials.map((cred) => {
				return (
					<div className="display-container">
						<div><strong>{cred.domain}</strong></div>
						<div>{cred.username}</div>
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
							<CopyBtn id={cred.cred_id} copyPass={copyPass} />
						</div>
					</div>
				);
			})}
		</React.Fragment>
	);
}

export default Display;
