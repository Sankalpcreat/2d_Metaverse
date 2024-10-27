2D Metaverse Game
Technologies Used
Frontend:
React:
For building a dynamic and interactive user interface.

Vite:
Modern development environment providing fast builds and hot-reloading for a seamless developer experience.

Phaser.js:
Game framework used to render the 2D environment and handle game logic.

Tailwind CSS:
A utility-first CSS framework used to style the app's user interface.

Socket.io:
Enables real-time, bi-directional communication between the server and clients, facilitating multiplayer interactions.

WebRTC:
Enables peer-to-peer video and audio communication between players when they are in close proximity.

Backend:
Node.js:
Server-side JavaScript runtime for handling API requests and game logic.

Express.js:
Framework used to manage API routes and middleware, facilitating smooth request/response handling.

Prisma ORM:
Object-relational mapper for interacting with the PostgreSQL database.

PostgreSQL:
Relational database system for securely storing user data and game-related information.

Socket.io:
Manages real-time event handling for the multiplayer game.

JWT:
Used for secure authentication and session management with JSON Web Tokens.

Folder Structure Overview
Frontend:
src/auth/:
Manages user authentication, including login, signup, and session handling.

src/components/:
Contains reusable components such as the game map, avatar, and interaction elements for the UI.

src/hooks/:
Custom React hooks for reusable logic, such as managing real-time communication (useSocket), WebRTC, and other functionality.

src/phaser/:
Phaser.js-specific game logic. This includes rendering the 2D world, handling player input, managing interactions, and loading game assets.

src/store/:
Manages global state using Redux or React Context for user authentication, game settings, and player data.

src/utils/:
Utility functions for tasks like loading maps, managing authentication, and handling interactions between players and objects.

src/pages/:
Represents the various views of the app, such as Home, Login, and Game Room, and manages the routing between these pages.

Backend:
Express.js:
Routes for API endpoints, authentication, and game-related services are handled here.

Prisma ORM:
Interfaces with the PostgreSQL database, ensuring secure storage and efficient querying of user profiles, game data, and other persistent information.

Socket.io:
Ensures real-time updates and data synchronization between players and the server, allowing for a seamless multiplayer experience.