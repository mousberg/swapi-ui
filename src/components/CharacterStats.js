import React from 'react';

const CharacterStats = ({ character }) => {
    const stats = [
        { label: 'Height', value: parseInt(character.height), max: 300 },
        { label: 'Mass', value: parseInt(character.mass), max: 200 },
    ];

    return (
        <div className="stats-container">
            {stats.map(stat => (
                <div key={stat.label} className="stat-bar">
                    <label>{stat.label}</label>
                    <div className="bar-container">
                        <div 
                            className="bar-fill" 
                            style={{width: `${(stat.value/stat.max) * 100}%`}}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterStats; 