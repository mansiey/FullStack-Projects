import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import "./Profile.css";

function Profile() {
    const { token } = useAuth();

    const [profile, setProfile] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await fetch(
                    "http://localhost:8080/users/profile",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to get profile"
                    );
                }

                // Storing the complete profile response
                setProfile(data);
                setUserName(data.user.userName || "");
            } catch (error) {
                console.error(
                    "Failed to get profile:",
                    error
                );

                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            getProfile();
        }

    }, [token]);


    async function handleUpdateProfile(event) {
        event.preventDefault();

        setMessage("");
        setError("");
        setUpdating(true);

        try {
            const response = await fetch(
                "http://localhost:8080/users/profile",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userName
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update profile"
                );
            }

            // Update only the user portion && Keep stats and leaderboard intact.
            setProfile(prev => ({
                ...prev,
                user: data.user
            }));

            setUserName(data.user.userName || "");
            setMessage("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError(error.message);
        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return <h2>Loading profile...</h2>;
    }

    if (error && !profile) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="profile-page">
            <h1>Profile</h1>

            <div className="profile-info">
                <div>
                    <h3>First Name</h3>
                    <p>{profile.user.firstName}</p>
                </div>

                <div>
                    <h3>userName</h3>
                    <p>{profile.user.userName}</p>
                </div>

            </div>

            {/* leaderboards */}
            <div className="game-stats">
                <h2>Game Stats</h2>

                <div className="game-stats-container">

                    <div className="stat-card">
                        <h3>Total Games</h3>
                        <p>{profile.stats.totalGames}</p>
                    </div>


                    <div className="stat-card">
                        <h3>Total Score</h3>
                        <p>{profile.stats.totalScore}</p>
                    </div>

                </div>
            </div>

            <div className="leaderboard-rank">
                <h2>Leaderboard Rankings</h2>

                <div className="leaderboard-container">
                    <div className="leaderboard-card">
                        <h3>Daily Rankings</h3>

                        <p>
                            Rank:{" "}
                            {profile.leaderboard.daily.rank
                                ? `#${profile.leaderboard.daily.rank}`
                                : "—"}
                        </p>

                        <p>
                            Score:{" "}
                            {profile.leaderboard.daily.score}
                        </p>

                        <p>
                            Games:{" "}
                            {profile.leaderboard.daily.totalGames}
                        </p>
                    </div>

                    <div className="leaderboard-card">
                        <h3>Weekly Rankings</h3>

                        <p>
                            Rank:{" "}
                            {profile.leaderboard.weekly.rank
                                ? `#${profile.leaderboard.weekly.rank}`
                                : "—"}
                        </p>

                        <p>
                            Score:{" "}
                            {profile.leaderboard.weekly.score}
                        </p>

                        <p>
                            Games:{" "}
                            {profile.leaderboard.weekly.totalGames}
                        </p>
                    </div>

                    <div className="leaderboard-card">
                        <h3>Global Ranking</h3>

                        <p>
                            Rank:{" "}
                            {profile.leaderboard.global.rank
                                ? `#${profile.leaderboard.global.rank}`
                                : "—"}
                        </p>

                        <p>
                            Score:{" "}
                            {profile.leaderboard.global.score}
                        </p>

                        <p>
                            Games:{" "}
                            {profile.leaderboard.global.totalGames}
                        </p>
                    </div>

                </div>
            </div>


            {/* USERNAME UPDATE */}
            <div className="profile-username">
                <form onSubmit={handleUpdateProfile}>

                    <h3>Username</h3>

                    <input
                        type="text"
                        value={userName}
                        onChange={(event) =>
                            setUserName(event.target.value)
                        }
                        placeholder="Enter username"
                        maxLength={30}
                    />

                    <button
                        type="submit"
                        disabled={updating}
                    >
                        {updating
                            ? "Updating..."
                            : "Update Username"}
                    </button>

                </form>

            </div>

            {message &&
                <p className="success-message">
                    {message}
                </p>}

            {error &&
                <p className="error-message">
                    {error}
                </p>}

        </div>
    );
}

export default Profile;