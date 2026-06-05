# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a RESTful backend application built using Node.js, Express.js, MySQL, and the GitHub REST API. The application analyzes GitHub user profiles, extracts useful insights, calculates a custom analysis score, and stores the results in a MySQL database for future retrieval.

---

## Features

* Analyze GitHub profiles using GitHub usernames
* Fetch public profile data from the GitHub API
* Store analyzed profile data in MySQL
* Calculate custom analysis scores based on:

  * Followers
  * Public Repositories
  * Total Stars
* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile
* Retrieve the highest-ranked analyzed profile
* Prevent duplicate entries using MySQL upsert functionality
* Error handling for invalid GitHub usernames

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Axios
* dotenv

---

## Project Structure

```text
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── .env
├── app.js
├── schema.sql
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Gunjankr078/github-profile-analyzer-api.git
cd github-profile-analyzer-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

### Create Database

Run the SQL script:

```sql
CREATE DATABASE github_analyzer;
```

Then execute the contents of `schema.sql`.

### Start Application

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
```

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/github/analyze/:username
```

Example:

```http
POST /api/github/analyze/octocat
```

### Get All Profiles

```http
GET /api/github/profiles
```

### Get Single Profile

```http
GET /api/github/profiles/:username
```

Example:

```http
GET /api/github/profiles/octocat
```

### Get Top Ranked Profile

```http
GET /api/github/top
```

---

## Sample Response

```json
{
  "success": true,
  "username": "octocat",
  "score": 67217,
  "totalStars": 21491,
  "totalForks": 165060
}
```

---

## Database Schema

The application stores the following information:

* Username
* Name
* Public Repositories
* Followers
* Following
* Public Gists
* Total Stars
* Total Forks
* Profile URL
* Avatar URL
* Account Creation Date
* Analysis Score
* Analysis Timestamp

---

## Future Enhancements

* Search functionality
* Profile ranking levels
* Swagger API documentation
* Cloud database integration
* Profile comparison feature
* Repository analytics dashboard

---

## Author

Gunjan Kumar

GitHub: https://github.com/Gunjankr078
