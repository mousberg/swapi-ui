import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();

    return (
        <header className="star-wars-header">
            <div className="header-content">
                <h1 
                    onClick={() => history.push('/')}
                    className="header-title"
                >
                    Star Wars Characters
                </h1>
                <div className="header-decoration"></div>
            </div>
        </header>
    );
};

export default Header; 