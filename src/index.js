import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import authService from "./services/auth.service";

axios.interceptors.request.use(
    request => {
        if (request.url.includes('admin')) {
            request.headers['X-AUTH-TOKEN'] = authService.getToken();
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
