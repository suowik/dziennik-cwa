import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import Group from './Group.js'
import Layout from './Layout.js'

class Routes extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/"component={Layout}>
                    <Route path="/:groupId" component={Group}/>
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(
    <Routes />,
    document.getElementById('root')
);