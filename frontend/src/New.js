import React from 'react';

const API = "http://localhost:8000/api/new";

function New(props) {
	const [domain, setDomain] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleDomain = (e) => { setDomain(e.target.value); };
	const handleUsername = (e) => { setUsername(e.target.value); };
	const handlePassword = (e) => { setPassword(e.target.value); };

	const handleClick = async () => {
		const req = await fetch(API, {
			method: 'POST',
			body: JSON.stringify({
				"key": props.pass,
				"domain": domain,
				"username": username,
				"password": password
			})
		});
		const reqJson = await req.json();
		console.log(reqJson);
		clearAll();
	}

	const clearAll = () => {
		setDomain('');
		setUsername('');
		setPassword('');
	}

	return (
	<div>
		<form>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label"><strong>Domain</strong></label>
				<div className="col-sm-10">
					<input type="text" className="form-control" value={domain} onChange={handleDomain} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label"><strong>Username</strong></label>
				<div className="col-sm-10">
					<input type="text" className="form-control" value={username} onChange={handleUsername} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label"><strong>Password</strong></label>
				<div className="col-sm-10">
					<input type="text" className="form-control" value={password} onChange={handlePassword} />
				</div>
			</div>
			<div className="form-group row">
				<div className="col-sm-10">
					<button type="button" className="btn btn-outline-secondary" onClick={handleClick}>Add New</button>
				</div>
			</div>
		</form>	
	</div>);
}

export default New;