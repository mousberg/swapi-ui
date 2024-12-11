import React from 'react';

const LoadingSpinner = () => (
    <div className="loading-container">
        <div className="lightsaber-loader">
            <div className="lightsaber-handle"></div>
            <div className="lightsaber-blade"></div>
        </div>
        <p>Loading from a galaxy far, far away...</p>
    </div>
);

export default LoadingSpinner; 