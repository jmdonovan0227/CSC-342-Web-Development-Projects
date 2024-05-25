# Homework 4 - Howler

## [Go Back](../README.md)

## How To Run

    1) Open a terminal in VSCode by selecting 'Terminal' and selecting 'New Terminal' or open a git bash terminal (where you have stored this git repo).
    2) Next, use 'cd Homework 1' to navigate inside of the homework 1 folder.
    3) Next, build a docker image with the command 'docker compose up --build' (if you have already down this before, just type 'docker compose up')
    4) Wait a few moments until the terminal prints some output and can you see that our project is running on localhost:80
    5) In your browser of choice, type 'localhost:80'. The default project is hw1. To view these html pages, click on part 1 or part 2 links. Other projects can also be accessed from this point by appending '/hw#' => ex: localhost:80/ takes you to hw1 by default as '/' is the default path. So to go to hw2 => type this link in your browser => locahost:80/hw2.

## Description

- Howler in simple terms in a client-side rendered network page. In howler a user can send a howl (a text entry about what they are thinking about). Sort of like a twitter 'tweet'. When users post a howl, their message will be ordered chronologically (newest message at the top). When opening howler, the user will first be presented with a login page. They only need a valid username (an existing user) in order to move to the main page. After logging in the user, will see the main page which will contain a title for the wepage with a text area below and a button which is where a user can type out and submit a new message. Below the message box, there are previous posts by the currently logged in users and the users they are following which are all ordered chronologically. If you then look at the top right, we can see the username of the currently logged in user and their profile picture. If the user then clicks on either the username of profile pic they will be taken to their profile page. On the profile page, the user will be able to see their profile picture, name, and their username. Further below that, we can see a list of people that the currently logged in user follows. And below that, we can see all howls posted by the currently logged in user (in chronological order). If you click on a user in the follows section on the profile page, you will be redirected to that user's profile page. A new button will appear which will be next to the user's information which will say either 'follow' if the user is not following that person or 'unfollow' if the user is currently following that person. If the user decides to unfollow that user. It will update in their profile page and on the main page. On the main page, all messages pertaining to that user will be removed if we are not following that user anymore. If we are following the user now, their messages will be included on the main page. On the profile page, the user will be either added (if now following) or removed from the current user's following list (if unfollowed). Information about the current users in the system, all posted messages, and information about the users another user is follow are stored in .json files. When we post messages, follow/unfollow users, and move between pages in the application we are using routes to retrieve information from the json files and using JS to populate the pages. We create sessions for the currently logged in user. This was a very in depth and exciting project for me!

## Technologies

- Docker, HTML, CSS, JavaScript, JSON, Express, REST api endpoints, Bootstrap (for a little bit of styling), NPM.
