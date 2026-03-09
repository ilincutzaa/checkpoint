# Checkpoint

A Next.js-based web application for managing games, users, and tags with authentication, two-factor authentication, and administrative features.
Practically, it's like a "Goodreads" for your games.

## Features

- User registration and login with JWT authentication
- Two-factor authentication (2FA) setup and verification
- Game creation, listing, updating, and deletion
- Tag management for games
- User dashboards and admin dashboard
- Real-time status monitoring (connection, network, server)
- API endpoints for games, users, tags, and health checks
- Database synchronization and seeding scripts
- Unit tests for API routes

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, JavaScript
- **Backend**: Next.js API routes
- **Database**: Sequelize (ORM)
- **Authentication**: JWT, 2FA
- **Testing**: Vitest
- **Styling**: CSS Modules
- **Package Manager**: npm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ilincamares/checkpoint.git
   cd checkpoint
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
    - Configure your database connection in `lib/sequelize.js`.
    - Run database sync:
      ```
      npm run db-sync
      ```
    - Seed the database:
      ```
      npm run seed-games
      npm run seed-users
      ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

- Access the app at `http://localhost:3000`.
- Register a new user or log in.
- Navigate to the user dashboard to manage games.
- Admins can access the admin dashboard for additional controls.
- Use the API endpoints for programmatic access.

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user info

### 2FA
- `POST /api/2fa/setup` - Set up 2FA
- `POST /api/2fa/teardown` - Disable 2FA
- `POST /api/2fa/verify` - Verify 2FA code
- `POST /api/2fa/verify-login` - Verify 2FA for login

### Games
- `GET /api/games` - List all games
- `POST /api/games` - Create a new game
- `GET /api/games/[id]` - Get game by ID
- `PUT /api/games/[id]` - Update game by ID
- `DELETE /api/games/[id]` - Delete game by ID
- `GET /api/games/stats` - Get game statistics

### Tags
- `GET /api/tags` - List all tags
- `POST /api/tags` - Create a new tag

### Health
- `GET /api/health` - Health check

## Testing

Run tests with:
```
npm test
```

Tests are located in `src/__tests__/`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db-sync` - Synchronize database
- `npm run seed-games` - Seed games data
- `npm run seed-users` - Seed users data
- `npm test` - Run tests
