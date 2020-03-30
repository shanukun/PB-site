import React, { useState } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

const API = "http://localhost:5000/api/"

function App() {
	const [isLogged, setLogged] = useState(false);

	return (
		<div>
			<h1>PassBack - Password Manager</h1>
			<Switch>
				<Route exact path="/" render={props => <LoginScreen {...props} setLogged={setLogged} />} />
				<Route exact path="/unauth" component={Unauthorized} />
				<ProtectedRoutePasswordScreen 
					exat path='/password'
					isLogged={isLogged}
					component={PasswordScreen} 
				/>
				<Route exat path='/dashboard' component={Dashboard} />
			</Switch>
		</div>
	);
}

function LoginScreen(props) {
	const [showMsg, setShowMsg] = useState(false);
	const [msg, setMsg] = useState('');

	const getJsonData = async () => {
		const resp = await fetch(API + "gdrivelogin");
		const data = await resp.json();
		console.log(data);
		if (data["login"] === true) {
			props.setLogged(true)
			setShowMsg(false);
			props.history.push('/password')
		} else {
			setMsg('Error.');
		}
	}

	const handleClick = (e) => {
		e.preventDefault()
		setMsg('Wait...');
		setShowMsg(true);
		getJsonData()
	}

	return (
		<div>
			<button className='login' onClick={handleClick}>Login with Google</button>
			{ showMsg ? <div className='msg'>{msg}</div> : null }
		</div>
	);
}

function PasswordScreen(props) {
	const [password, setPassword] = useState('');
	const [showMsg, setShowMsg] = useState(false);
	const [msg, setMsg] = useState('');

	const sendRequest = async () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ key: password })
		};
		const resp = await fetch(API + 'passkey', requestOptions)
		const data = await resp.json();
		if (data['recieved']) {
			props.history.push('/dashboard')
		} else {
			setMsg('Error.');
		}
	}

	const handleClick = (e) => {
		e.preventDefault();
		setShowMsg(true);
		if (password) {
			sendRequest();
			setMsg('Wait...')
		} else {
			setMsg('Empty Password.')
		}
	}

	return (
		<div>
			<label>Password:</label><br />
			<input type="password" className="keyPassword" id="inputPassword" 
				   onChange={e => setPassword(e.target.value)} /><br />

			<button onClick={handleClick}>Enter</button>
			{ showMsg ? msg : null }
		</div>

	);
}

function Dashboard() {
	return (
		<div>
			<h3>Dashboard</h3>
		</div>
	);
}

function Unauthorized()  {
	return (
		<div>
			<h3>403 - Unauthorized</h3>
			<p><Link to="/">Back To Home</Link></p>
		</div>
	);
}

const ProtectedRoutePasswordScreen = ({component: Component, isLogged, ...rest}) => {
	return (
		<Route {...rest} render={
			props =>  {
				if (isLogged) {
					return <Component {...rest} {...props} /> ;
				} else {
					return <Redirect to={
						{
							pathname: '/unauth',
							state: {
								from: props.location
							}
						}
					} />
				}
			}
		} />
	);
}

export default App;
