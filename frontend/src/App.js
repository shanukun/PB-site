import React from 'react';
import { Store } from './Store';
import Display from './Display';
import New from './New';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';

const API = "http://localhost:8000/api/";

function App() {
	const { dispatch } = React.useContext(Store);

	const [key, setKey] = React.useState("");
	const [keyLocked, setKeyLocked] = React.useState(false);
	const [show, setShow] = React.useState(false);

	const handleGet = () => {
		if (keyLocked) {
			fetchData();
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

	return (
		<div className="passback-container">
			<div className="title-container">
				<div>
					<h2>PASSBACK</h2>
				</div>
				<div className="title-buttons">
						<Link to="/">Home</Link>
						<Link to="/new">New</Link>
				</div>
			</div>
			<div className="key-container">
				<div>
					<button type="button" 
							onClick={handleGet}>
							Get
					</button>
				</div>
				<div>
					<button type="button" 
							onClick={handleLock}>
						{ keyLocked ? "Unlock" : "Lock" }
					</button>
				</div>
				<input type={ show ? "text" : "password" } 
					   placeholder="Enter Key..." value={key} onChange={handleChange} />
				<div>
					<button type="button" id="button-addon1" 
							onClick={handleShow}>
						{ show ? "Hide" : "Show" }
					</button>
				</div>
			</div>	
			<div>
				<Switch>
					<Route exact path="/" render={props => <Display {...props} pass={key} />} />
					<Route exact path="/new" render={props => <New {...props} pass={key} />} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
