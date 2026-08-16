import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

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
        <div>
            <h1>ClickRush</h1>

            <h2>Score: {score}</h2>

            <h2>Time: {timeLeft}s</h2>

            {gameOver && <h2>Game Over!</h2>}

            <button onClick={startGame}>
                {gameStarted ? "Restart Game" : gameOver ? "Play Again" : "Start Game"}
            </button>

            {gameStarted && (
                <button onClick={cancelGame}>
                    Cancel Game  
                </button>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 80px)",
                    gap: "10px",
                    marginTop: "30px"
                }}
            >
                {cells.map((index) => (
                    <button
                        key={index}
                        onClick={() => handleCellClick(index)}
                        style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor:
                                index === activeCell && gameStarted
                                    ? "red"
                                    : "lightgray",
                            border: "1px solid black",
                            cursor: gameStarted ? "pointer" : "default"
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Games;