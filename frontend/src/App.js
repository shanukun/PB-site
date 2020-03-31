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
			</Switch>
		</div>
	);
}
export default App;
