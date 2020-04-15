import React from 'react';
import { Store } from './Store';

const API = "http://localhost:8000/api/";

const ShowBtn = (props) => {
	const [show, setShow] = React.useState(false);
	const handleClick = () => {
		setShow(!show);
		props.fetchPass(props.id)
	}
	return (
		<button type="button" className="btn btn-sm btn-light" onClick={handleClick}>
			{ show ? "Hide" : "Show" }
		</button>
	);
}

function Display(props) {
	const { state } = React.useContext(Store);
	const [passState, setPassState] = React.useState({});

	const addPassToLIst = (id, pass) => {
		const passObject = {pass: pass, show: true};
		setPassState(passState => ({
			...passState,
			[id]: passObject
		}));

	}

	const fetchPassword = async (id) => {
		const data = await fetch(API + "getpass", {
			method: 'POST',
			body: JSON.stringify({"key" : props.pass,
			"cred_id": id})
		});
		const dataJson = await data.json();
		addPassToLIst(id, dataJson.password);
	}

	return (
		<React.Fragment>
			{ state.credentials.map((cred) => {
				return (
					<div className="card text-white bg-dark mb-3">
						<div className="card-body">
							<div className="row">
								<div className="col-2"><strong>{cred.domain}</strong></div>
								<div className="col-3">{cred.username}</div>
								<div className="col-sm">{ cred.password }</div>
								{/* <div className="col-sm">{ passState[cred.cred_id]['show'] ? passState[cred.cred_id]['pass'] : cred.password }</div> */}
								<div className="col-md-auto">
									<ShowBtn id={cred.cred_id} fetchPass={fetchPassword} />
								</div>
								<div className="col-md-auto pl-0">
									<button type="button" className="btn btn-sm btn-light">
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