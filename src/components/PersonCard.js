import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PersonCard = ({ person }) => {
    const history = useHistory();
    const id = person.url.split('/')[5];
    const [imageError, setImageError] = useState(false);

    // Character images mapping
    const CHARACTER_IMAGES = {
        'Luke Skywalker': 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
        'C-3PO': 'https://starwars-visualguide.com/assets/img/characters/2.jpg',
        'R2-D2': 'https://starwars-visualguide.com/assets/img/characters/3.jpg',
        'Darth Vader': 'https://starwars-visualguide.com/assets/img/characters/4.jpg',
        'Leia Organa': 'https://starwars-visualguide.com/assets/img/characters/5.jpg',
        'Owen Lars': 'https://starwars-visualguide.com/assets/img/characters/6.jpg',
        'Beru Whitesun lars': 'https://starwars-visualguide.com/assets/img/characters/7.jpg',
        'R5-D4': 'https://starwars-visualguide.com/assets/img/characters/8.jpg',
        'Biggs Darklighter': 'https://starwars-visualguide.com/assets/img/characters/9.jpg',
        'Obi-Wan Kenobi': 'https://starwars-visualguide.com/assets/img/characters/10.jpg',
    };

    const getImageUrl = () => {
        if (imageError) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=300&background=random`;
        }
        return CHARACTER_IMAGES[person.name] || `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleClick = () => {
        history.push(`/person/${id}`);
    };

    return (
        <div className="person-card">
            <div className="person-card-image">
                <img 
                    src={getImageUrl()}
                    alt={person.name}
                    onError={handleImageError}
                />
            </div>
            <div className="person-card-content">
                <h2>{person.name}</h2>
                <p><strong>Gender:</strong> {person.gender}</p>
                <p><strong>Birth Year:</strong> {person.birth_year}</p>
                <button className="view-button" onClick={handleClick}>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default PersonCard;