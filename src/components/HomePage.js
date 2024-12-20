import React, { useState, useEffect } from 'react';
import PersonCard from './PersonCard';
import LoadingSpinner from './LoadingSpinner';

const API_URL = 'https://swapi.py4e.com/api/'

const HomePage = () => {
    const [people, setPeople] = useState([]);
    const [allPeople, setAllPeople] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const fetchAllPeople = async () => {
            try {
                let allCharacters = [];
                let nextUrl = `${API_URL}/people/`;

                while (nextUrl) {
                    const response = await fetch(nextUrl);
                    if (!response.ok) throw new Error('Failed to fetch data');
                    const data = await response.json();
                    allCharacters = [...allCharacters, ...data.results];
                    nextUrl = data.next;
                }

                setAllPeople(allCharacters);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAllPeople();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`${API_URL}/people/?page=${currentPage}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    setPeople(data.results);
                    setTotalPages(Math.ceil(data.count / 10));
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [currentPage, searchTerm]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredPeople = searchTerm
        ? allPeople.filter(person =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : people;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPaginationButtons = () => {
        if (windowWidth <= 480) {
            return (
                <>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button className="active">
                        {currentPage} / {totalPages}
                    </button>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </>
            );
        }

        return (
            <>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </>
        );
    };

    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="home-page">
            <div className="content-container">
                <input
                    type="text"
                    placeholder="Search Characters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="card-container">
                    {isLoading && !searchTerm ? (
                        <LoadingSpinner />
                    ) : filteredPeople.length > 0 ? (
                        filteredPeople.map((person, index) => (
                            <PersonCard key={index} person={person} />
                        ))
                    ) : (
                        <p>No characters found</p>
                    )}
                </div>
                {!searchTerm && (
                    <div className="pagination">
                        {renderPaginationButtons()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;