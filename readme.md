# Rest-api-ts

This is a TypeScript project with a REST API using MongoDB and an Express Node server. The API provides user registration, login, and CRUD operations with authorization for administrators.

## API Endpoints

The following API endpoints are available:

-   POST /api/register: Register a new user.
-   POST /api/login: Log in an existing user.
-   GET /users: Get a list of all user(requires admin authentication).
-   GET /users/:id: Get details of a specific user (requires admin authentication).
-   PUT /users/:id: Update a specific user (requires admin authentication).
-   DELETE /users/:id: Delete a specific user (requires admin authentication).

## Prerequisites

Before running this project, make sure you have the following installed:

-   Node.js
-   MongoDB

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/ronit18/rest-api-ts.git
    ```

2. Install the dependencies:

    ```bash
    cd project-directory
    npm i
    ```

3. Configure the .env file..

    - rename .env.example to .env
    - Add your mongodbUrl and secret.

4. Start the dev server.
    ```bash
    npm start
    ```

The server will start running at http://localhost:8080

## Error Handling

-   If an endpoint fails or encounters an error, it will respond with an appropriate error message and status code.
-   The server will log the errors to the console.
