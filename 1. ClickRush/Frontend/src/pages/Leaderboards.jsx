import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

function Leaderboards() {
    const [daily, setDaily] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [global, setGlobal] = useState([]);

    const { token } = useAuth();

    useEffect(() => {
        async function fetchLeaderboards() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const [dailyResponse, weeklyResponse, globalResponse] =
                    await Promise.all([
                        fetch("http://localhost:8080/leaderboard/daily", {
                            method: "GET",
                            headers
                        }),

                        fetch("http://localhost:8080/leaderboard/weekly", {
                            method: "GET",
                            headers
                        }),

                        fetch("http://localhost:8080/leaderboard/global", {
                            method: "GET",
                            headers
                        })
                    ]);

                const dailyData = await dailyResponse.json();
                const weeklyData = await weeklyResponse.json();
                const globalData = await globalResponse.json();

                console.log("Daily:", dailyData);
                console.log("Weekly:", weeklyData);
                console.log("Global:", globalData);

                setDaily(dailyData.leaderboard);
                setWeekly(weeklyData.leaderboard);
                setGlobal(globalData.leaderboard);

            } catch (error) {
                console.error("Failed to fetch leaderboards:", error);
            }
        }

        if (token) {
            fetchLeaderboards();
        }
    }, [token]);

    function renderLeaderboard(title, leaderboard) {
        return (
            <section>
                <h2>{title}</h2>

                {leaderboard.length === 0 ? (
                    <p>No games played yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Games</th>
                                <th>Score</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.map((user) => (
                                <tr key={user.rank}>
                                    <td>{user.rank}</td>
                                    <td>{user.displayName}</td>
                                    <td>{user.totalGames}</td>
                                    <td>{user.totalScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        );
    }

    return (
        <div>
            <h1>Leaderboards</h1>

            {renderLeaderboard("Daily", daily)}

            {renderLeaderboard("Weekly", weekly)}

            {renderLeaderboard("Global", global)}
        </div>
    );
}

export default Leaderboards;