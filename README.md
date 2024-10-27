Technologies Used
Frontend:
React: For building the user interface.
Vite: Development environment for fast builds and hot-reloading.
Phaser.js: Game framework for rendering the 2D game.
Tailwind CSS: Styling for the app UI.
Socket.io: Real-time communication between clients and the server.
WebRTC: For proximity-based video/audio chat between users.

Backend:
Node.js: Backend server.
Express.js: For handling API routes and middleware.
Prisma ORM: For database interaction (PostgreSQL).
PostgreSQL: Relational database for storing user and game data.
Socket.io: Real-time event handling for the game.
JWT: Authentication and session management.

src/auth/:
Handles user authentication, including login, signup, and session management.

src/components/:
Contains reusable UI and game components like the map, avatar, and object interactions.

src/hooks/:
Custom React hooks for managing real-time communication (e.g., useSocket) and other reusable logic.

src/phaser/:
Manages Phaser.js game logic, including rendering the game world, handling player input, and interactions.

src/store/:
Manages global application state using Redux or Context for player data, authentication, and game settings.

src/utils/:
Utility functions to assist with tasks like map loading, authentication, and interactions.

src/pages/:
Contains different page views (e.g., Home, Login, GameRoom) used for routing between sections of the app.
