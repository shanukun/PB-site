import React, { useState } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';


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
	return (
		<div>
			<button className='login'>Login with Google</button>
		</div>
	);
}

function PasswordScreen() {
	return (
		<div>
			<label for="inputPassword">Password:</label>
			<input type="password" className="keyPassword" id="inputPassword" />
		</div>

	);
}

function Unauthorized()  {
	return (
		<div>
			<h3>403 - Unauthorized</h3>
			<p><Link to="/unauth" /></p>
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
