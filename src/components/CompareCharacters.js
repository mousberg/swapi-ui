import React, { useState, useEffect } from 'react';
import CharacterStats from './CharacterStats';

const CompareCharacters = ({ characters }) => {
    const [char1, setChar1] = useState(null);
    const [char2, setChar2] = useState(null);
    const [battleResult, setBattleResult] = useState(null);
    const [imageError1, setImageError1] = useState(false);
    const [imageError2, setImageError2] = useState(false);
    const [specialBattle, setSpecialBattle] = useState(null);

    // Define iconic battles with special messages and animations
    const ICONIC_BATTLES = {
        'Luke Skywalker-Darth Vader': {
            message: "The Force is strong in this family duel!",
            animation: 'force-clash',
            quote: "No, I am your father!"
        },
        'Obi-Wan Kenobi-Darth Vader': {
            message: "A battle between master and apprentice!",
            animation: 'high-ground',
            quote: "You were the chosen one!"
        },
        'Emperor Palpatine-Yoda': {
            message: "A clash between the most powerful Force users!",
            animation: 'force-lightning',
            quote: "The dark side of the Force is a pathway to many abilities some consider to be unnatural."
        },
        'Han Solo-Boba Fett': {
            message: "The smuggler versus the bounty hunter!",
            animation: 'blaster-duel',
            quote: "I've been looking forward to this for a long time."
        },
        'Leia Organa-Darth Vader': {
            message: "Father and daughter face off!",
            animation: 'force-family',
            quote: "The Force runs strong in my family."
        }
    };

    // Check for iconic battle matchup
    useEffect(() => {
        if (char1 && char2) {
            const matchup1 = `${char1.name}-${char2.name}`;
            const matchup2 = `${char2.name}-${char1.name}`;
            
            if (ICONIC_BATTLES[matchup1]) {
                setSpecialBattle(ICONIC_BATTLES[matchup1]);
            } else if (ICONIC_BATTLES[matchup2]) {
                setSpecialBattle(ICONIC_BATTLES[matchup2]);
            } else {
                setSpecialBattle(null);
            }
        }
    }, [char1, char2]);

    const calculatePowerLevel = (character) => {
        // Base calculations
        const height = parseInt(character.height) || 0;
        const mass = parseInt(character.mass) || 0;
        
        if ((character.height === "unknown" || character.height === "none") &&
            (character.mass === "unknown" || character.mass === "none")) {
            return null;
        }
        
        let powerLevel = (height * 0.6) + (mass * 0.4);
        
        // Special character base power levels - more thematic
        const basePower = {
            'Darth Vader': 200,
            'Luke Skywalker': 190,
            'Yoda': 200,
            'Obi-Wan Kenobi': 180,
            'Emperor Palpatine': 195,
            'Leia Organa': 150,
            'Han Solo': 140,
            'Boba Fett': 145,
            'General Grievous': 160,
            'Chewbacca': 155
        };

        // If it's a special character, use their base power instead
        if (basePower[character.name]) {
            powerLevel = basePower[character.name];
        }

        return powerLevel;
    };

    const handleSpecialBattle = (char1, char2, power1, power2) => {
        // Special case for Luke vs Vader
        if ((char1.name === 'Luke Skywalker' && char2.name === 'Darth Vader') ||
            (char2.name === 'Luke Skywalker' && char1.name === 'Darth Vader')) {
            return {
                winner: 'Luke Skywalker',
                description: "Turned to the light side and won!",
                quote: "There is still good in you, Father!",
                animation: 'force-clash' // Keep the animation
            };
        }
        return null;
    };

    const startBattle = () => {
        if (!char1 || !char2) return;

        const power1 = calculatePowerLevel(char1);
        const power2 = calculatePowerLevel(char2);
        
        let result;
        
        if (power1 === null && power2 === null) {
            result = "Both fighters are shrouded in mystery - battle cannot be determined!";
        } else if (power1 === null) {
            result = `${char2.name} wins by default - ${char1.name}'s power is unknown!`;
        } else if (power2 === null) {
            result = `${char1.name} wins by default - ${char2.name}'s power is unknown!`;
        } else {
            // Check for special battle outcome first
            const specialOutcome = handleSpecialBattle(char1, char2, power1, power2);
            
            if (specialOutcome) {
                result = {
                    ...specialOutcome,
                    powerLevels: {
                        [char1.name]: Math.round(power1),
                        [char2.name]: Math.round(power2)
                    }
                };
            } else {
                // Normal battle outcome
                const winner = power1 > power2 ? char1 : char2;
                const powerDiff = Math.abs(power1 - power2);
                
                let battleDescription;
                if (powerDiff > 50) {
                    battleDescription = "Absolutely demolished their opponent!";
                } else if (powerDiff > 30) {
                    battleDescription = "Won with impressive strength!";
                } else {
                    battleDescription = "Barely won in an epic battle!";
                }

                result = {
                    winner: winner.name,
                    description: battleDescription,
                    powerLevels: {
                        [char1.name]: Math.round(power1),
                        [char2.name]: Math.round(power2)
                    }
                };
            }
        }

        setBattleResult(result);
    };

    const resetBattle = () => {
        // Reset all states in a single batch
        setBattleResult(null);
        setChar1(null);
        setChar2(null);
        setImageError1(false);
        setImageError2(false);
        setSpecialBattle(null);
    };

    // Character images mapping (reusing from PersonCard)
    const getImageUrl = (character, id) => {
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

        if (!character) return '';
        const characterId = character.url.split('/')[5];
        return CHARACTER_IMAGES[character.name] || 
               `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
    };

    return (
        <div className="compare-panel">
            <h2>Character Battle Arena</h2>
            <div className="battle-selection">
                <div className="character-selector">
                    <h3>Choose Fighter 1</h3>
                    <div className="character-portrait">
                        {char1 && (
                            <img 
                                src={!imageError1 ? getImageUrl(char1) : `https://ui-avatars.com/api/?name=${encodeURIComponent(char1.name)}&size=300&background=random`}
                                alt={char1.name}
                                onError={() => setImageError1(true)}
                            />
                        )}
                    </div>
                    <select 
                        value={char1 ? characters.indexOf(char1) : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setImageError1(false);
                            setSpecialBattle(null);
                            setBattleResult(null);
                            setChar1(value === '' ? null : characters[value]);
                        }}
                    >
                        <option value="">Select a character...</option>
                        {characters.map((char, index) => (
                            <option key={index} value={index}>
                                {char.name}
                            </option>
                        ))}
                    </select>
                    {char1 && <CharacterStats character={char1} />}
                </div>

                <div className="battle-divider">
                    <div className="vs-symbol">VS</div>
                    {char1 && char2 && !battleResult && (
                        <div className="lightsaber-cross">
                            <div className="lightsaber blue"></div>
                            <div className="lightsaber red"></div>
                        </div>
                    )}
                </div>

                <div className="character-selector">
                    <h3>Choose Fighter 2</h3>
                    <div className="character-portrait">
                        {char2 && (
                            <img 
                                src={!imageError2 ? getImageUrl(char2) : `https://ui-avatars.com/api/?name=${encodeURIComponent(char2.name)}&size=300&background=random`}
                                alt={char2.name}
                                onError={() => setImageError2(true)}
                            />
                        )}
                    </div>
                    <select 
                        value={char2 ? characters.indexOf(char2) : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setImageError2(false);
                            setSpecialBattle(null);
                            setBattleResult(null);
                            setChar2(value === '' ? null : characters[value]);
                        }}
                    >
                        <option value="">Select a character...</option>
                        {characters.map((char, index) => (
                            <option key={index} value={index}>
                                {char.name}
                            </option>
                        ))}
                    </select>
                    {char2 && <CharacterStats character={char2} />}
                </div>
            </div>

            <div className="battle-controls">
                {char1 && char2 ? (
                    <button 
                        className="battle-button" 
                        onClick={startBattle}
                    >
                        Start Battle!
                    </button>
                ) : (
                    <p>Select two characters to begin the battle!</p>
                )}
            </div>

            {specialBattle && !battleResult && (
                <div className={`special-battle-alert ${specialBattle.animation}`}>
                    <p className="special-battle-message">{specialBattle.message}</p>
                    <p className="special-battle-quote">"{specialBattle.quote}"</p>
                </div>
            )}

            {battleResult && (
                <div className="battle-result">
                    <div className="winner-announcement">
                        {typeof battleResult === 'string' ? (
                            <h3>{battleResult}</h3>
                        ) : (
                            <>
                                <h3>{battleResult.winner} {battleResult.description}</h3>
                                {battleResult.quote && (
                                    <p className="iconic-quote">"{battleResult.quote}"</p>
                                )}
                                <div className="victory-animation"></div>
                                <div className="power-levels">
                                    <p>{char1.name}'s Power Level: {battleResult.powerLevels[char1.name]}</p>
                                    <p>{char2.name}'s Power Level: {battleResult.powerLevels[char2.name]}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <button 
                        className="reset-button" 
                        onClick={resetBattle}
                    >
                        Reset Battle
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompareCharacters; 