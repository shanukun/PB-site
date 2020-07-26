import React from 'react';
import './New.css';

const GoAPI = "http://localhost:8000/api/new";

function New(props) {
	const [domain, setDomain] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleDomain = (e) => { setDomain(e.target.value); };
	const handleUsername = (e) => { setUsername(e.target.value); };
	const handlePassword = (e) => { setPassword(e.target.value); };

	const handleClick = async () => {
		const req = await fetch(GoAPI, {
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
		<div className="form-container">
			<div>
				<label><strong>Domain</strong></label>
				<div>
					<input type="text" value={domain} onChange={handleDomain} />
				</div>
			</div>
			<div>
				<label><strong>Username</strong></label>
				<div>
					<input type="text" value={username} onChange={handleUsername} />
				</div>
			</div>
			<div>
				<label><strong>Password</strong></label>
				<div>
					<input type="text" value={password} onChange={handlePassword} />
				</div>
			</div>
			<div>
				<div></div>
				<div>
					<button type="button" onClick={handleClick}>Add New</button>
				</div>
			</div>
		</div>
	);
}

export default New;
