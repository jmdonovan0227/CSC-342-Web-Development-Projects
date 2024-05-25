# Homework 3 - Pay Your Friends

## [Go Back](../README.md)

## How To Run

    1) Open a terminal in VSCode by selecting 'Terminal' and selecting 'New Terminal' or open a git bash terminal (where you have stored this git repo).
    2) Next, use 'cd Project1' to navigate inside of the project 1 folder.
    3) Next, build a docker image with the command 'docker compose up --build' (if you have already down this before, just type 'docker compose up')
    4) Wait a few moments until the terminal prints some output and can you see that our project is running on localhost:80
    5) In your browser of choice, type 'localhost:80'. The default project is p1. To view these html pages, click on part 1 or part 2 links. Other projects can also be accessed from this point by appending '/p#' => ex: localhost:80/ takes you to p1 by default as '/' is the default path. So to go to p2 => type this link in your browser => locahost:80/p2.

## Description

- This project focuses on using HTML, CSS, and JavaScript to create, style, and validate an HTML form. In sender details we provide an image (.png, .jpg, .jpeg, etc) when sending to a recipient as well as a first name and last name. For the recipient, we need their first and last name, a message we send to the recipient, a notify option that can be by email, SMS, or do not notify (Note: these will not send a notification, but will check that valid information is provided depending on which option is selected). If email is selected in notify recipient section we must provide a valid email. If we select sms in notify recipient section, we must provide a valid phone number (valid format). We then provide payment details including the card type, a card number, an expiration date, a ccv number, an amount, and a checkbox to agree to terms. If everything submitted is valid, we will be sent to another page indicating successful payment (sent to success.html). If we are missing fields, a message will pop up indicating where we are missing information. One user call Stuart Dent or Stu Dent is outlawed in the system and if we try to send payment to this user, we will be sent to an error page instead (assuming all information is valid) this page is error.html.

## Technologies

- Docker, HTML, CSS, JS, Express(to statically serve CSS, images, and JS in our static folder. HTML files are served through routes), NPM.
