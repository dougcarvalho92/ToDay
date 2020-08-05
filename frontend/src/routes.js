import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Register from './pages/Register';
import Login from './pages/Login/index';
import ListTask from './pages/ListTask/index';
import DefaultLayout from './components/Layout';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <DefaultLayout  path="/" exact component={Login} rootpage={true}/>
                <DefaultLayout  path="/register" component={Register} rootpage={true}/>
                <DefaultLayout  path="/list" component={ListTask} />
            </Switch>
        </BrowserRouter>
    );
}