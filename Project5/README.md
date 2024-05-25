# Homework 5 - Authentication with JWT

## [Go Back](../README.md)

## How To Run

    1) Open a terminal in VSCode by selecting 'Terminal' and selecting 'New Terminal' or open a git bash terminal (where you have stored this git repo).
    2) Next, use 'cd Project1' to navigate inside of the project 1 folder.
    3) Next, build a docker image with the command 'docker compose up --build' (if you have already down this before, just type 'docker compose up')
    4) Wait a few moments until the terminal prints some output and can you see that our project is running on localhost:80
    5) In your browser of choice, type 'localhost:80'. The default project is p1. To view these html pages, click on part 1 or part 2 links. Other projects can also be accessed from this point by appending '/p#' => ex: localhost:80/ takes you to p1 by default as '/' is the default path. So to go to p2 => type this link in your browser => locahost:80/p2.
    6) To be able to login using JWT token authentication you need to define a .env file within the Project 5 folder. The .env file should sit outside of all other folders at the same level as README.md. You only need to define an "API_SECRET". To see how your .env file needs to be setup, use .env_sample for reference. Remember you need to create '.env' with the same setup as '.env_sample'.
    7) Next, change the env_file under proxy in docker-compose.yml to look for .env file in the Project 5 directory. It is currently using the sample '.env_sample' which is only a placeholder to allow docker to run when the API_SECRET is not defined.
    8) To login, you need a valid username and password. A valid username is 'student' and a valid password is 'password'. This is a very basic implementation of a login system with JWT Token Authentication. There is only one valid user currently in the system.

## Description

- On the frontend, this project just consists of a login and home page. Once the user is authenticated, they should be able to view the homepage and logout. On the backend we authenticate the user with JWT tokens. We did not user the jwt library, but created the tokens ourselves. To achieve this, we use the base64url library, which we used to encode the header and the payload. We then created a JWT signature with SHA-256 hashing algorithm. We used the crypto package from Node.js to compute an HMAC. We use a middleware module that will read the token from a cookie (HTTP-only cookie) and validate it. We first check that JWT header and payload match, then we check an 'exp' field to make sure the token is not expired. I also confirmed that the jwt tokens generated are valid using JWT.io (to make sure that they are compliant JWTs).

## Technologies

- Docker, REST api endpoints, HTML, CSS, JS, Express, NPM, base64url, crypto.
