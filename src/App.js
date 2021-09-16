import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path={["/", "/home", "/menu"]} component={Menu}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
