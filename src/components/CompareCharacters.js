import React, { useState } from 'react';

const CompareCharacters = ({ characters }) => {
    const [char1, setChar1] = useState(null);
    const [char2, setChar2] = useState(null);

    return (
        <div className="compare-panel">
            <h2>Compare Characters</h2>
            <div className="comparison-container">
                {/* Character selection and comparison logic */}
            </div>
        </div>
    );
}; 