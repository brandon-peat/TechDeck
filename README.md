# TechDeck

TechDeck is a full-stack social platform for sharing posts and messaging. It features a modern Angular web frontend, a .NET backend API, and a SQL Server database. Users can create posts (with images), reply, like, search for people, and chat in real time.

## Features

- User registration, authentication, and profile management
- Create, view, and reply to posts (with image attachments)
- Like posts and view who liked them
- Real-time private messaging between users
- Search for people and start conversations
- Personal timeline and public activity feed

## Solution Structure

- `TechDeck.Web` – Angular frontend (UI for posts, profiles, chat, etc.)
- `TechDeck.Api` – ASP.NET Core Web API (business logic, authentication, messaging, etc.)
- `TechDeck.Core` – Core domain models and interfaces
- `TechDeck.Persistence` – Entity Framework Core data access
- `TechDeck.Identity` – Identity and authentication services
- `TechDeck.Database` – SQL Server database project (schema, tables, publish profile)
- `TechDeck.UnitTests` – Unit tests for backend logic

## Installation

1. Open the `.sln` file in the root
2. In the `TechDeck.Database` project, double click the script `TechDeck.Database.publish.xml`
3. Select `Publish`
4. Open the `.sln` file in the root
5. In the `TechDeck.Database` project, double click the script `TechDeck.Database.publish.xml`
6. Select `Publish`

If you open SQL Server Management Studio and connect to:

- Server name: `(localdb)\MSSQLLocalDB`
- Authentication: Windows Authentication

You should now see a database called TechDeck with a table `Person.Person`.

## Frontend (Angular) Setup

Navigate to the `TechDeck.Web` directory for frontend development:

- Run `npm install` to install dependencies.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- Run `ng test` to execute unit tests via [Jest](https://jestjs.io/).

## Deployment

### Database

You will need these VS Code extensions:

- SQL Database Projects
- SQL Server (mssql)

1. In the SQL Server tab, connect to the Azure database. The password for this will be kept secret. Your IP will need to be whitelisted.
2. CTRL + SHIFT + P: Database projects: Focus on Database Projects View
3. Right click TechDeck.Database > Publish > Publish to an existing SQL Server > Browse for Profile > TechDeck.Database.publish.xml

### API

In Visual Studio, right click TechDeck.Api > Publish

### Angular

You will need:

- Azure CLI installed
- Azure static web apps CLI

1. ng build --configuration production
2. $token = az staticwebapp secrets list --name techdeck-web --resource-group techdeck --query "properties.apiKey" -o tsv; swa deploy ./dist/tech-deck/browser --deployment-token $token --env production
