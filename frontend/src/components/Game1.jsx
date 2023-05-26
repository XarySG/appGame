import { useState, useEffect } from "react";
import "./Game1.css";

const options = [
    { id: 0, name: "Rock", emoji: "✊", beats: [2, 3] },
    { id: 1, name: "Paper", emoji: "🧻", beats: [0] },
    { id: 2, name: "Scissors", emoji: "✂️", beats: [1, 3] },
    { id: 3, name: "Lizard", emoji: "🦎", beats: [1] },
    { id: 4, name: "Spock", emoji: "🖖", beats: [3, 0] },
];

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 0;
    }

    if (options[userChoice].beats.includes(computerChoice)) {
        return 1;
    }

    return 2;
};

function OptionButton({ option, handlePlay, disabled }) {
    return (
        <button
            className="px-4 py-2 m-2 text-xl font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={() => handlePlay(option.id)}
            title={option.name}
        >
            {option.emoji}
        </button>
    );
}

function useChoices() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [userMessage, setUserMessage] = useState(null);
    const [computerMessage, setComputerMessage] = useState(null);
    const [result, setResult] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [playerName, setPlayerName] = useState("user");

    useEffect(() => {
        if (userChoice !== null) {
            setUserMessage(
                `You have chosen ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
            );
        }
    }, [userChoice]);

    useEffect(() => {
        if (computerChoice !== null) {
            setComputerMessage(
                `PC has chosen ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name
                }`
            );
        }
    }, [computerChoice]);

    useEffect(() => {
        if (result !== null && gameOver) {
            const gameData = {
                jugador: playerName,
                resultado:
                    result === 1 ? "Win" : result === 2 ? "Lose" : "Draw",
            };
            console.log(gameData);

            fetch("http://localhost:3000/game1/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameData),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Succesfully sent data");
                    } else {
                        console.log("Error sending data");
                    }
                })
                .catch((error) => {
                    console.log("Error with POST request:", error);
                });
        }
    }, [result, gameOver]);
    const handlePlay = (choice) => {
        setUserChoice(choice);
        setDisabled(true);
        const randomChoice = Math.floor(Math.random() * 5);

        setTimeout(() => {
            setComputerChoice(randomChoice);
        }, 1500);

        setTimeout(() => {
            setResult(getResult(choice, randomChoice));
            setGameOver(true);
        }, 3000);
    };

    const reset = () => {
        setUserChoice(null);
        setComputerChoice(null);
        setUserMessage(null);
        setComputerMessage(null);
        setResult(null);
        setDisabled(false);
        setGameOver(false);
    };

    return {
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
    };
}

function Game() {
    const {
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
    } = useChoices();

    const [playerName, setPlayerName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleStartGame = () => {
        if (playerName.trim() === '') {
            alert('Please, insert your name before playing.');
            return;
        }

        setPlayerName('');
        setGameStarted(true);
    };

    const handlePlayAgain = () => {
        reset();
        setGameStarted(false);
    };

    return (
        
        <div className="container">
            <h1 className="title">Play</h1>
            
            {!gameStarted ? (
                <div>
                    <input
                        type="text"
                        value={playerName}
                        onChange={handleNameChange}
                        placeholder="Insert your name"
                    />

                    <button id="startbtn" className="start-game" onClick={handleStartGame}>
                        Start the game
                    </button>
                </div>
            ) : (
                <div>
                    {options.map((option) => (
                        <OptionButton
                            key={option.id}
                            option={option}
                            handlePlay={handlePlay}
                            disabled={disabled}
                        />
                    ))}
                    {userChoice !== null && <p className="message">{userMessage}</p>}
                    {computerChoice !== null && <p className="message">{computerMessage}</p>}
                    {result !== null && (
                        <div>
                            {result === 0 && <p className="result">Draw 🤷🏽‍♀️</p>}
                            {result === 1 && (
                                <p className="result">
                                    ✅ You have won with {options[userChoice]?.name} against{" "}
                                    {options[computerChoice]?.name}
                                </p>
                            )}
                            {result === 2 && (
                                <p className="result">
                                    ❌ You have lost with {options[userChoice]?.name} against{" "}
                                    {options[computerChoice]?.name}
                                </p>
                            )}
                            <button className="play-again" onClick={handlePlayAgain}>
                                Play Again
                            </button>
                            
                            <br />

                        </div>
                    )}
                </div>
            )}
        </div>
    
    );
}

export default Game;