import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import './Games.css';

function Games() {
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [activeCell, setActiveCell] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);

    const cells = Array.from({ length: 16 }, (_, index) => index);

    //extract token to stay authenticated
    const { token } = useAuth();

    // Timer
    useEffect(() => {
        if (!gameStarted) return;

        const timer = setInterval(() => {
            setTimeLeft((previousTime) => {
                if (previousTime <= 1) {
                    clearInterval(timer);
                    setGameStarted(false);
                    setGameOver(true);
                    setActiveCell(null);

                    return 0;
                }

                return previousTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted]);

    useEffect(() => {
        if (!gameOver) return;

        async function submitScore() {
            try {
                const response = await fetch("http://localhost:8080/games", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        score: score
                    })
                });

                const data = await response.json();

                console.log("Score submission status:", response.status);
                console.log("Score submission response:", data);
            } catch (error) {
                console.error("Failed to submit score:", error);
            }
        }

        submitScore();
    }, [gameOver, token, score]);

    function startGame() {
        setScore(0);
        setTimeLeft(60);
        setGameStarted(true);
        setGameOver(false);

        const randomCell = Math.floor(Math.random() * 16);
        setActiveCell(randomCell);
    }

    function cancelGame() {
        setGameStarted(false);
        setGameOver(false);
        setActiveCell(null);
        setScore(0);
        setTimeLeft(60);
    }

    function handleCellClick(index) {
        if (!gameStarted) return;

        if (index === activeCell) {
            setScore((previousScore) => previousScore + 1);

            const randomCell = Math.floor(Math.random() * 16);
            setActiveCell(randomCell);
        }
    }

    return (
        <div className="games-page">

    <h1>ClickRush</h1>

    <div className="game-hud">
        <div className="game-stat">
            <span>Score</span>
            <strong>{score}</strong>
        </div>

        <div className="game-stat">
            <span>Time</span>
            <strong>{timeLeft}s</strong>
        </div>
    </div>

    {gameOver && <h2 className="game-over">Game Over!</h2>}

    <div className="game-controls">
        <button onClick={startGame} className="start-button">
            {gameStarted ? "Restart Game" : gameOver ? "Play Again" : "Start Game"}
        </button>

        {gameStarted && (
            <button onClick={cancelGame} className="cancel-button">
                Cancel Game
            </button>
        )}
    </div>

    <div className="game-grid">
        {cells.map((index) => (
            <button
                key={index}
                onClick={() => handleCellClick(index)}
                className={`game-cell ${
                    index === activeCell && gameStarted ? "active-cell" : ""
                }`}
            >
                {index + 1}
            </button>
        ))}
    </div>

</div>
    );
}

export default Games;