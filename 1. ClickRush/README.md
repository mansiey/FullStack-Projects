# ClickRush

ClickRush is a full-stack click-speed game where users can create an account, play games, save their scores, view their profile, and compete on daily, weekly, and global leaderboards.

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

- Frontend: React
- Backend: Node.js / Express
- Database: PostgreSQL
- ORM: Drizzle ORM
- Authentication: JWT
- Package Manager: pnpm, npm

---
## Local Setup

### 1. Clone the repository
- git clone <YOUR_GITHUB_REPOSITORY_URL>
- cd ClickRush 

### 2. Install dependencies
- pnpm install

### 3. Configure environment variables
- Create the required .env file in the backend and add the database connection and JWT configuration used by the application.
- Example:
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

### 4. Set up the database
- From the backend directory use commands:
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

### 5. Start the backend
- pnpm build
- pnpm start

-
### 6. Start the frontend
From the frontend directory:
npm run dev,
Open the local frontend URL shown by Vite in the terminal.

---

### Database Schema
- The application uses two main tables:

### usersTable
Stores user account and profile information.
- id
- username
- email
- password/authentication data
- profile information

### gamesTable
Stores every completed game.
- id
- user_id → references users.id (i.e they're both same)
- score
- played timestamp (time of the game)

The relationship between users and games allows scores to be associated with individual users and used to generate rankings.

---

### Leaderboards
ClickRush provides three ranking categories:
- Daily
- Weekly
- Global
Leaderboard entries display the player's rank, username, number of games, and score.

---

### Authentication Flow

1. User signs up or signs in.
2. The backend issues a JWT.
3. The frontend stores the token and sends it with protected requests.
4. Backend middleware verifies the token.
5. The token is used to authorize profile, game, and leaderboard-related operations.

---

### Demo
- Live App: <https://full-stack-projects-cyan.vercel.app/>
- Demo Video: <DEMO_VIDEO_URL>
- GitHub: <GITHUB_REPOSITORY_URL>

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



---
