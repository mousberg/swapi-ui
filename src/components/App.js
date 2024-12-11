import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';
import HomePage from './HomePage';
import PersonDetail from './PersonDetail';

function App() {
    return (
        <div className="app">
            <Header />
            <ErrorBoundary>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/person/:id" component={PersonDetail} />
                </Switch>
            </ErrorBoundary>
        </div>
    );
}

export default App;