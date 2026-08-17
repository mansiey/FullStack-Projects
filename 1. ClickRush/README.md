# ClickRush

ClickRush is a full-stack speed-clicking game where users compete to achieve the highest score within a 60-second game.

The application provides user authentication, protected routes, gameplay, score tracking, user profiles, and Daily, Weekly, and Global leaderboards.

---

## Features

- User signup and login
- JWT-based authentication
- JWT token expiration
- Protected frontend and backend routes
- Logout functionality
- 60-second clicking game
- Score submission and tracking
- User profile and game statistics
- Username update
- Daily leaderboard
- Weekly leaderboard
- Global leaderboard
- Responsive UI
- PostgreSQL database
- Drizzle ORM
- Environment-based configuration

---

## Technology Stack

### Frontend

- React
- React Router
- Vite
- JavaScript / JSX
- CSS

### Backend

- Node.js
- Express
- TypeScript
- JWT
- Zod

### Database

- PostgreSQL
- Drizzle ORM

---

## Project Structure

```text
1. ClickRush/
│
├── Backend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── games/
│   │   │   ├── leaderboards/
│   │   │   ├── middleware/
│   │   │   ├── users/
│   │   │   └── utils/
│   │   │
│   │   ├── db/
│   │   │   ├── index.ts
│   │   │   └── schema.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── drizzle/
│   ├── .env.example
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
