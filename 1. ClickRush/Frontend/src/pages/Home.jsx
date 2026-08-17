import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <section className="home-hero">

                <h3 className="home-eyebrow">
                    TEST YOUR SPEED
                </h3>

                <h1>ClickRush</h1>

                <h3 className="home-tagline">
                    How fast can you click?
                </h3>

                <h3 className="home-description">
                    Click the target. Beat the clock. Chase your high score.
                </h3>

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


            <h3 className="home-footer">
                Fast. Simple. Competitive.
            </h3>

        </div>
    );
}

export default Home;