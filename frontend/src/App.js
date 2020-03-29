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
				<ProtectedRoute exat path='/password' isLogged={isLogged} component={PasswordScreen} />
			</Switch>
		</div>
	);
}

function LoginScreen(props) {
	const [showMsg, setShowMsg] = useState(false);
	const [msg, setMsg] = useState('');

	const getJsonData = async () => {
		const resp = await fetch(API + "gdrivelogin");
		resp.json().then(data => {
			if (data["login"] === true) {
				props.setLogged(true)
				setShowMsg(false);
				props.history.push('/password')
			} else {
				setMsg('Error.');
			}
		});
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

function PasswordScreen() {
	const [password, setPassword] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
	}

	return (
		<div>
			<label>Password:</label><br />
			<input type="password" className="keyPassword" id="inputPassword" /><br />
			<button onClick={handleClick}>Enter</button>
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

const ProtectedRoute = ({component: Component, isLogged, ...rest}) => {
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
