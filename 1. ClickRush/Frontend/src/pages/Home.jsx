import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">

            {/* Hero */}
            <section className="home-hero">

                <p className="home-eyebrow">
                    TEST YOUR SPEED
                </p>

                <h1>ClickRush</h1>

                <p className="home-tagline">
                    How fast can you click?
                </p>

                <p className="home-description">
                    Click the target. Beat the clock. Chase your high score.
                </p>

                <div className="home-actions">
                    <button
                        className="play-button"
                        onClick={() => navigate("/games")}
                    >
                        PLAY NOW
                    </button>

                    <button
                        className="leaderboard-button"
                        onClick={() => navigate("/leaderboard")}
                    >
                        LEADERBOARD
                    </button>
                </div>

            </section>


            {/* Game Information */}
            <section className="home-info">

                <div className="home-info-card">
                    <strong>60s</strong>
                    <span>Game Time</span>
                </div>

                <div className="home-info-card">
                    <strong>16</strong>
                    <span>Targets</span>
                </div>

                <div className="home-info-card">
                    <strong>∞</strong>
                    <span>Attempts</span>
                </div>

            </section>


            {/* Bottom Message */}
            <p className="home-footer">
                Fast. Simple. Competitive.
            </p>

        </div>
    );
}

export default Home;