import React from 'react';
import './App.css';

function loginGoogle() {
	return (
		<GoogleLogin
			clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
  		  	buttonText="Login"
  		  	onSuccess={responseGoogle}
  		  	onFailure={responseGoogle}
  		  	cookiePolicy={'single_host_origin'}
		/>
	
	);
}

function App() {
	return (
		<div className="container">
			<h1>Pass Back</h1>     
			{loginGoogle}
		</div>
	);
}

export default App;
