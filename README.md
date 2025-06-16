# GraphQL by Example – Study Projects

This repository contains multiple projects to help you learn GraphQL by example:

## 1. Starter Project (`starter/`)
- **Goal:** Show that running GraphQL doesn't require a fancy backend or frontend.
- **Backend:** Minimal Express.js server with GraphQL.
- **Frontend:** Simple HTML file (no frameworks or libraries needed).
- **Use case:** Great for understanding the basics of GraphQL queries and mutations without extra complexity.

## 2. Job Board Project (`job-board/`)
- **Goal:** Demonstrate a more structured, modern GraphQL application.
- **Backend:** Express.js server with GraphQL integrated as middleware, includes authentication and database.
- **Frontend:** React-based UI using Apollo Client for GraphQL.
- **Use case:** Learn how GraphQL fits into real-world, full-stack JavaScript apps.

## 3. Job Board TypeScript Project (`job-board-typescript/`)
- **Goal:** Modern job board example using TypeScript for both backend and frontend.
- **Backend:** Express.js server with GraphQL, written in TypeScript.
- **Frontend:** React + TypeScript using Apollo Client.
- **Use case:** Learn how to use GraphQL in a full-stack TypeScript environment.

## 4. Chat Project (`chat/`)
- **Goal:** Explore GraphQL in the context of a chat application.
- **Backend:** Express.js server with GraphQL (see `chat/server/`).
- **Frontend:** Modern JavaScript frontend (see `chat/client/`).
- **Use case:** Study real-time or message-based features with GraphQL.

---

## Getting Started

1. **Starter Project**
   - Run the server:
     ```bash
     cd starter/server
     npm install
     npm start
     ```
   - Open `starter/client/index.html` in your browser.

2. **Job Board Project**
   - Start the backend:
     ```bash
     cd job-board/server
     npm install
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../client
     npm install
     npm run dev
     ```

3. **Job Board TypeScript Project**
   - Start the backend:
     ```bash
     cd job-board-typescript/server
     npm install
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd ../client
     npm install
     npm run dev
     ```

4. **Chat Project**
   - Start the backend:
     ```bash
     cd chat/server
     npm install
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../client
     npm install
     npm run dev
     ```

---

Choose the project that matches your learning goals: start simple, then move to more advanced examples!