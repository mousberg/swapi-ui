import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

// Simple cache object
const cache = {
    people: {},
    planets: {}
};

const PersonDetail = ({ match }) => {
    const [person, setPerson] = useState(null);
    const [planet, setPlanet] = useState(null);
    const [neighbors, setNeighbors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;
        const fetchPerson = async () => {
            try {
                setIsLoading(true);
                const personId = match.params.id;

                // Check cache first
                if (cache.people[personId]) {
                    setPerson(cache.people[personId]);
                    if (cache.planets[cache.people[personId].homeworld]) {
                        const planetData = cache.planets[cache.people[personId].homeworld];
                        setPlanet(planetData);
                        await fetchNeighbors(planetData, cache.people[personId].url);
                        return;
                    }
                }

                // Fetch person if not cached
                const response = await fetch(`https://swapi.dev/api/people/${personId}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch person data');
                }
                const personData = await response.json();
                cache.people[personId] = personData;
                if (isSubscribed) {
                    setPerson(personData);
                }

                // Fetch planet data
                const planetResponse = await fetch(personData.homeworld);
                if (!planetResponse.ok) {
                    throw new Error('Failed to fetch planet data');
                }
                const planetData = await planetResponse.json();
                cache.planets[personData.homeworld] = planetData;
                if (isSubscribed) {
                    setPlanet(planetData);
                    await fetchNeighbors(planetData, personData.url);
                }
            } catch (err) {
                if (isSubscribed) {
                    setError(err.message);
                }
            } finally {
                if (isSubscribed) {
                    setIsLoading(false);
                }
            }
        };

        fetchPerson();
        return () => {
            isSubscribed = false;
        };
    }, [match.params.id]);

    const fetchNeighbors = async (planetData, currentPersonUrl) => {
        const residentsPromises = planetData.residents
            .filter(url => url !== currentPersonUrl)
            .map(async url => {
                if (cache.people[url]) {
                    return cache.people[url];
                }
                const res = await fetch(url);
                const data = await res.json();
                cache.people[url] = data;
                return data;
            });
        const residents = await Promise.all(residentsPromises);
        setNeighbors(residents);
    };

    if (error) return <div className="error-message">Error: {error}</div>;
    if (isLoading) return <LoadingSpinner />;
    if (!person || !planet) return null;

    return (
        <div className="person-detail">
            <button className="back-button" onClick={() => history.push('/')}>
                ← Back
            </button>
            <h1>{person.name}</h1>
            <div className="person-info">
                <p>
                    <strong>Height:</strong>
                    <span>{person.height}cm</span>
                </p>
                <p><strong>Mass:</strong> {person.mass}kg</p>
                <p><strong>Birth Year:</strong> {person.birth_year}</p>
                <p><strong>Gender:</strong> {person.gender}</p>
                <p><strong>Eye Color:</strong> {person.eye_color}</p>
                <p><strong>Hair Color:</strong> {person.hair_color}</p>
                <p><strong>Home Planet:</strong> {planet.name}</p>
            </div>
            <div className="neighbors">
                <h2>Planet Neighbors from {planet.name}</h2>
                {neighbors.length > 0 ? (
                    <div className="neighbors-grid">
                        {neighbors.map((neighbor, index) => (
                            <div 
                                key={index} 
                                className="neighbor-card"
                                onClick={() => {
                                    const id = neighbor.url.split('/')[5];
                                    history.push(`/person/${id}`);
                                }}
                            >
                                <h3>{neighbor.name}</h3>
                                <p>Birth Year: {neighbor.birth_year}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No other residents found on this planet</p>
                )}
            </div>
        </div>
    );
};

export default PersonDetail;