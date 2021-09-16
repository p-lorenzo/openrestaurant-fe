import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
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
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path={["/", "/home", "/menu"]} component={Menu}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
