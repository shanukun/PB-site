import React from 'react';
import { Store } from './Store';

const API = "http://localhost:8000/api/";

function Display(props) {
	const { state } = React.useContext(Store);

	const fetchPassword = async (id) => {
		const data = await fetch(API + "getpass", {
			method: 'POST',
			body: JSON.stringify({"key" : props.pass,
			"cred_id": id})
		});
		const dataJson = await data.json();
		console.log(dataJson);
	}

	const ShowBtn = (props) => {
		const [show, setShow] = React.useState(false);

		const handleClick = () => {
			setShow(!show);
			fetchPassword(props.id)
		}

		return (
			<button type="button" className="btn btn-sm btn-light" onClick={handleClick}>
				{ show ? "Hide" : "Show" }
			</button>
		);
	}

	return (
		<React.Fragment>
			{ state.credentials.map((cred) => {
				return (
					<div className="card text-white bg-dark mb-3">
						<div className="card-body">
							<div key={cred.cred_id} className="row">
								<div className="col-2"><strong>{cred.domain}</strong></div>
								<div className="col-3">{cred.username}</div>
								<div className="col-sm">{cred.password}</div>
								<div className="col-md-auto">
									<ShowBtn id={cred.cred_id} />
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