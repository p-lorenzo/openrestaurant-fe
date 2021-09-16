import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MenuEntries from "./components/MenuEntries";
import AddEntryForm from "./components/AddEntryForm";
import authService from "./services/auth.service";


const App = () => {
    const [showAdminDashboard, setShowAdminDashboard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowAdminDashboard(Object.values(user.user.roles).includes("ROLE_ADMIN"));
        }
    }, []);

    const logout = () => {
        authService.logout();
    };

    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <Link to={"/"} className="navbar-brand">Menù</Link>
                    <div className="navbar-nav mr-auto">
                        {showAdminDashboard && (
                            <li className="nav-item">
                                <Link to={"/dashboard"} className="nav-link">
                                    Area amministrativa
                                </Link>
                            </li>
                        )}
                        {showAdminDashboard && (
                            <li className="nav-item">
                                <Link to={"/menu-entries"} className="nav-link">
                                    Pietanze
                                </Link>
                            </li>
                        )}
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {currentUser.email}
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link" onClick={logout}>
                                    Log-out
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Log-in
                                </Link>
                            </li>

                            {/*<li className="nav-item">*/}
                            {/*    <Link to={"/register"} className="nav-link">*/}
                            {/*        Sign Up*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                        </div>
                    )}
                </nav>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/menu-entries" component={MenuEntries} />
                    <Route exact path="/new-menu-entry" component={AddEntryForm} />
                    <Route exact path="/" component={Menu} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
