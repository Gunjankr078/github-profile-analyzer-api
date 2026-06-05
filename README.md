
# GitHub Profile Analyzer API

## Overview

A REST API built using Node.js, Express.js, MySQL, and the GitHub API that analyzes GitHub user profiles and stores useful insights in a database.

## Features

* Analyze GitHub profiles by username
* Store profile insights in MySQL
* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile
* Get the highest-ranked analyzed profile
* Calculate custom analysis scores based on repositories, followers, and stars

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API

## Installation

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

Start the server:

```bash
npm run dev
```

## API Endpoints

### Analyze Profile

POST `/api/github/analyze/:username`

### Get All Profiles

GET `/api/github/profiles`

### Get Single Profile

GET `/api/github/profiles/:username`

### Get Top Profile

GET `/api/github/top`

## Database

The project stores GitHub profile statistics including followers, repositories, stars, forks, and a calculated analysis score.

## Future Enhancements

* Search functionality
* Profile ranking levels
* API documentation using Swagger
* Deployment with cloud database
