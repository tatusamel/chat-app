# Chat Application

A simple real-time chat application built with Svelte for the frontend and Spring Boot for the backend. The application uses WebSockets for real-time communication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- Real-time messaging with WebSockets
- User can join the chat with a custom username
- Messages are displayed differently for the sender and other users
- Messages include sender name and timestamp
- Responsive UI built with Tailwind CSS

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Java JDK](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (version 17 or higher)
- [Maven](https://maven.apache.org/)

## Getting Started

### Backend Setup

1. Navigate to the `chat-backend` directory:

   ```bash
   cd chat-backend
   ```

2. Build the backend application using Maven:

   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot aplication:

   ```bash
   ./mvnw spring-boot:run
   ```

The backend server will start on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the frontend application:

   ```bash
   npm run dev
   ```

The frontend server will be available at `http://localhost:5173`.

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open the frontend application in your browser at `http://localhost:5173`.
3. You will be prompted to enter your username.
4. Start sending messages in the chat room.
5. Open the application in another browser or tab to simulate multiple users.

## Project Structure

### Backend (`chat-backend`)

- `src/main/java/com/example/chat`
  - `ChatBackendApplication.java`: Main application class.
  - `config`: Configuration files for CORS and WebSocket setup.
    - `WebConfig.java`
    - `WebSocketConfig.java`
  - `controller`: WebSocket message controller.
    - `ChatController.java`
  - `model`: Data models.
    - `ChatMessage.java`
  - `repository`: JPA repositories.
    - `ChatMessageRepository.java`

### Frontend (`frontend`)

- `src`
  - `App.svelte`: Main Svelte component.
  - `main.js`: Entry point of the frontend application.
  - `lib`
    - `components`
      - `Chat.svelte`: Chat message component.
    - `services`
      - `websocket.ts`: WebSocket service.
    - `stores`
      - `messageStore.ts`: Svelte store for messages.
    - `types`
      - `ChatMessage.ts`: TypeScript interface for chat messages.
  - `app.css`: Global styles.
- `tailwind.config.js`: Tailwind CSS configuration.
- `vite.config.js`: Vite configuration.

## Technologies Used

- **Frontend**:
  - [Svelte](https://svelte.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [SockJS](https://github.com/sockjs/sockjs-client)
  - [STOMP.js](https://stomp-js.github.io/stomp-websocket/)
- **Backend**:
  - [Spring Boot](https://spring.io/projects/spring-boot)
  - [Spring WebSocket](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket)
  - [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
  - [H2 Database](https://www.h2database.com/)
