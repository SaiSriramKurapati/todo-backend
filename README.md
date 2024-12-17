# Backend for Todo List App

This directory contains the backend code for the Todo List App. The backend is built with Node.js, Express.js, and Prisma ORM for managing database interactions. Follow the steps below to clone, set up, and run the project locally.

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or higher recommended)
- **MySQL** (Ensure the database server is running locally)
- **npm** or **yarn**
- **Prisma CLI** (Optional but helpful)

---

## Instructions

### 1. Clone the Repository

Clone the project and navigate into the backend directory:

```bash
   git clone https://github.com/your-username/todo-backend.git
   cd todo-backend
```

### 2. Install Dependencies

```bash
   npm install
```

# Setting Up the Database and Prisma

## Step 1: Install MySQL

## 1.Install MySQL**:
   - Download and install MySQL from [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
   - Follow the installation instructions for your operating system.

## 2.Start MySQL Server**:
   - Ensure the MySQL server is running on your system. Use the command:
     ```bash
     mysql.server start
     ```
   - Alternatively, start it using your operating system's services manager or MySQL Workbench.

## 3.Login to MySQL**:
   - Access your MySQL server via the terminal or MySQL Workbench:
     ```bash
     mysql -u root -p
     ```
   - Enter the password for the `root` user or another user you’ve set up.

## 4.Create a Database**:
   - Run the following SQL command to create a database:
     ```sql
     CREATE DATABASE todo;
     ```
   - Replace `todo` with your preferred database name if needed.

---

## Step 2: Install Prisma CLI

## 1. Install Prisma as a Development Dependency:
   - Run the following command in your project directory:

   ```bash
      npm install prisma --save-dev
   ```

## 2. Initialize Prisma:

   ```bash
      npx prisma init
   ```

## 3. Define the DB url in the .env file:
   ```bash
      DATABASE_URL="mysql://root@localhost:3001/database_name"
   ```
   - Replace USER with your MySQL username (e.g., root).
   - Replace PASSWORD with your MySQL password.
   - Replace PORT with your MySQL port (e.g., 3306 for default MySQL).
   - Replace DATABASE_NAME with your desired database name.

## 4. Run Migrations

   - Run the following command to create a migration and apply it to the database:

   ```bash
      npx prisma migrate dev --name init
   ```

## 5. Generate Prisma Client
   
   ```bash
      npx prisma generate
   ```
## 6. Start Prisma Studio Use the following command to launch Prisma Studio:

   ```
   npx prisma studio
   ```
   - Once the command is executed, Prisma Studio will open in your default browser at: 
   ```bash
      http://localhost:5555
   ```

