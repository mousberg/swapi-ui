import React from 'react';

const CharacterStats = ({ character }) => {
    const formatValue = (value, unit) => {
        if (value === "unknown" || value === "none" || !value) {
            return "Unknown";
        }
        const numValue = parseInt(value);
        return isNaN(numValue) ? "Unknown" : `${numValue}${unit}`;
    };

    const stats = [
        { 
            label: 'Height', 
            value: formatValue(character.height, 'cm'),
            rawValue: parseInt(character.height) || 0,
            max: 300 
        },
        { 
            label: 'Mass', 
            value: formatValue(character.mass, 'kg'),
            rawValue: parseInt(character.mass) || 0,
            max: 200 
        },
    ];

    return (
        <div className="stats-container">
            {stats.map(stat => (
                <div key={stat.label} className="stat-bar">
                    <div className="stat-header">
                        <span className="stat-label">{stat.label}</span>
                        <span className="stat-value">{stat.value}</span>
                    </div>
                    <div className="bar-container">
                        <div 
                            className={`bar-fill ${stat.value === "Unknown" ? 'unknown' : ''}`}
                            style={{
                                width: stat.value === "Unknown" 
                                    ? '30%' 
                                    : `${(stat.rawValue/stat.max) * 100}%`
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterStats; 