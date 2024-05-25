# Homework 2 - Basic Calculator

## [Go Back](./README.md)

## How To Run

    1) Open a terminal in VSCode by selecting 'Terminal' and selecting 'New Terminal' or open a git bash terminal (where you have stored this git repo).
    2) Next, use 'cd Homework 1' to navigate inside of the homework 1 folder.
    3) Next, build a docker image with the command 'docker compose up --build' (if you have already down this before, just type 'docker compose up')
    4) Wait a few moments until the terminal prints some output and can you see that our project is running on localhost:80
    5) In your browser of choice, type 'localhost:80'. The default project is hw1. To view these html pages, click on part 1 or part 2 links. Other projects can also be accessed from this point by appending '/hw#' => ex: localhost:80/ takes you to hw1 by default as '/' is the default path. So to go to hw2 => type this link in your browser => locahost:80/hw2.

## Description

- This project consists of building a basic web calculator that has a computation history. It includes a +/- button for changing a sign. Any invalid operations will make the calculator print 'Error' which is a situation where no other buttons on the calculator will work. To fix this, click the clear button 'C' and the calculator will reset. When performing calculations you will be able to do things such as pressing a number, an operator, another number and equals sign to get the result of the calculation (ex: 1 + 1 = 2). After performing the calculation, the result will be saved in the computation history to the right of the calculator. You are allowed to click on these values in order to use those numbers in later calculations. When clicking on a history value, it will overwrite the existing number typed in the calculator or make it appear if nothing is currently typed in the calculator (ex: if you press '2' from computation history it will show up in the input bar on the calculator). You are also able to clear history by clicking the 'Clear History' button. If you want to be able to use floats, you can use the '.' when typing out a float. Chaining calculations is also possible with this calculator. For example if you type '1 + 1 +' this will perform the calculation and print 2 in the input bar and will save the plus operator for the next value. If you type a different operator after one has already been pushed, it will overwrite the current operator if there isn't a number to complete the operation. For example, if you type '1 + 1 +' you will get '2 +'. If you then type '\*' and type '2', you will get a value of 4.

## Technologies

- Docker (this is the first project Docker was being used), HTML, CSS, JavaScript (DOM events, objects, arrays, etc), NPM.

## Citations

// Citation for Roboto Font From Google Fonts
Robertson, Christian, "Roboto", Google Fonts, https://fonts.google.com/specimen/Roboto, Accessed 29 Sep. 2023.
