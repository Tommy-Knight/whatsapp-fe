import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./components/Home";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Landing} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				<Route path='/home' exact component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
