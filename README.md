# TODO App
A full-stack TODO application built with Angular 22 (frontend) and .NET 10 Web API (backend).

## Features

- View all TODO items ordered by due date and then title
- Add a new TODO with an optional due date
- Delete a TODO
- Mark a TODO as completed by checking it
- Delete all completed TODOs in bulk
- Overdue TODOs highlighted in red
- Title limited to 500 characters

## Prerequisites

- .NET 10 SDK
- Node.js 22+
- Angular CLI 22

## Running the Application

### 1. Start the Backend API

```bash
cd webapi/TodoApp.Api
dotnet run
```

API will be available at `http://localhost:5084`

Swagger UI available at `http://localhost:5084/swagger`

### 2. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
ng serve
```

Frontend will be available at `http://localhost:4200`

## Running the Tests

### Backend tests (.NET xUnit)

```bash
cd webapi
dotnet test TodoApp.Tests/TodoApp.Tests.csproj
```

### Frontend tests (Vitest)

```bash
cd frontend
ng test --watch=false`
```

## Notes

- Data is stored in-memory and will be lost when the API restarts. This is by design as per the assessment requirements
- The API URL is hardcoded to `http://localhost:5084` in environment.ts. Update this if your API runs on a different port
