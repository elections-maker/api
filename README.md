# ElectionsMaker API 🔥

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Local Setup](#local-setup)
   - [Prerequisites](#prerequisites)
   - [Step-by-Step Setup](#step-by-step-setup)
3. [Branch Strategy](#branch-strategy)
4. [Naming Conventions](#naming-conventions)
   - [Variables and Functions](#variables-and-functions)
   - [Files and Folders](#files-and-folders)
5. [Commit Conventions](#commit-conventions)

## Technologies Used

Here is the table with the descriptions for the technologies and tools:

| **Technology/Tool** | **Description**                          |
| ------------------- | ---------------------------------------- |
| **Node.js**         | Server-side JavaScript runtime           |
| **Hono**            | Web framework for Node.js                |
| **PostgreSQL**      | SQL database for data storage            |
| **Prisma ORM**      | ORM to interact with PostgreSQL          |
| **JWT**             | Token-based secure authentication        |
| **TypeScript**      | Optional typing for scalable development |
| **Prettier**        | Formatter to ensure code quality         |

## **Local Setup**

### Prerequisites

Here's the updated information including the installation requirements:

| **Requirement** | **Version** |
| --------------- | ----------- |
| **Node.js**     | >= 18.x     |
| **Pnpm**        | >= 8.x      |
| **PostgreSQL**  | 16          |

### Step-by-Step Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/elections-maker/api.git

   cd api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure the .env file**

   Copy the `.env.example` file and rename it to `.env` and modify the configuration variables according to your environment.

4. **Start the application**

   Start the API server in development mode:

   ```bash
   pnpm start:dev
   ```

   The API will now be running at http://localhost:8000.

## Branch Conventions

Here is the table representation of the branching strategy:

| **Branch Type**        | **Description**                                     | **Derived From** |
| ---------------------- | --------------------------------------------------- | ---------------- |
| main                   | Stable and production-ready version                 | -                |
| develop                | Active development branch                           | -                |
| feature/{feature-name} | Branch for new features or improvements             | develop          |
| bugfix/{fix-name}      | Branch for specific bug fixes                       | develop          |
| hotfix/{fix-name}      | Urgent fixes that need to be merged into production | main             |

## **Naming Conventions**

Here's the table with the naming conventions:

| **Category**                | **Naming Convention** | **Example**                              |
| --------------------------- | --------------------- | ---------------------------------------- |
| **Variables and Functions** | `camelCase`           | `const camelCase = camelCaseFunction();` |
| **Files and Folders**       | `kebab-case`          | `kebab-case-file-01.ts`                  |

## Commit Convetions

Here is the table representation of the commit message guidelines:

| Commit Type | Description                                 |
| ----------- | ------------------------------------------- |
| feat        | Add a new feature                           |
| fix         | Fix a bug                                   |
| refactor    | Improve code without changing functionality |
| test        | Add or modify tests                         |
| docs        | Modify or add documentation                 |
