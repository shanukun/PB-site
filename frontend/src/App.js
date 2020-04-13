import React, { useState } from 'react';
import { Store } from './Store';
import Display from './Display';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

const API = "http://localhost:8000/api/";

function App() {
	const { state, dispatch } = React.useContext(Store);

	const [key, setKey] = React.useState("");
	const [keyLocked, setKeyLocked] = React.useState(false);
	const [show, setShow] = React.useState(false);
	const [showPop, setShowPop] = React.useState(false);

	const handleGet = () => {
		if (keyLocked) {
			fetchData();
		} else {
			setShowPop(true);
		}
	}

	const handleLock = () => {
		setKeyLocked(!keyLocked);
	}

	const handleShow = () => {
		setShow(!show);
	}

	const handleChange = (e) => {
		if (!keyLocked) {
			setKey(e.target.value);
		} else {
			setKey(key);
		}
	}

	const fetchData = async () => {
		const data = await fetch(API);
		const dataJson = await data.json();
		console.log(dataJson);
		dispatch({
			type: 'FETCH',
			payload: dataJson
		});
	};

	return (
		<div className="container">
			<div className="row mt-4">
				<div className="col">
					<h1>PASSBACK</h1>
				</div>
				<div className="col-md-auto">
					<button type="button" className="btn btn-outline-primary">Show</button>
				</div>
				<div className="col-md-auto">
					<button type="button" className="btn btn-outline-primary">New</button>
				</div>
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<button className="btn btn-outline-secondary" 
							type="button" id="button-addon1" 
							onClick={handleGet}>
							Get
					</button>
				</div>
				<div className="input-group-prepend">
					<button className="btn btn-outline-secondary" 
							type="button" id="button-addon1" 
							onClick={handleLock}>
						{ keyLocked ? "Unlock" : "Lock" }
					</button>
				</div>
				<input type={ show ? "text" : "password" } className="form-control" 
					   placeholder="Enter Key..." value={key} onChange={handleChange} />
				<div className="input-group-append">
					<button className="btn btn-outline-secondary" 
							type="button" id="button-addon1" 
							onClick={handleShow}>
						{ show ? "Hide" : "Show" }
					</button>
				</div>
			</div>	
			<Switch>
				<Route exact path="/" render={props => <Display {...props} />} />
			</Switch>
		</div>
	);
}

export default App;
