# Setup Guide

## [Go Back](../README.md)

## Required Downloads

- ### [NodeJS](https://nodejs.org/en/)
  - A variety of NodeJS tools are used across these projects including Express for building the web applications and API, Multer for form data in Homework 3, and NPM to install packages and run scripts.
- ### [Docker Desktop](https://docs.docker.com/get-docker/)
  - This will be necessary to download as we use Docker to run our docker images which are built based off of instructions defined in our Dockerfiles. Our docker-compose.yml file will define our container(s) and run them.
  - **NOTE:** if you are using Windows, make sure you also have WSL 2 isntalled. You can open PowerShell or Windows Command Prompt as an administrator and type 'wsl --install'. This will install WSL or tell you that it is already installed.
- ### [Visual Studio Code](https://code.visualstudio.com/)
  - This will be necessary to run
    - #### Extensions
      1. _Docker Extension_
         - To keep this simple, this can help make it easier to build, manage, and deploy our web applications that use Docker containers.
      2. _Remote Development Extension_
         - This is also necessary as an extension that can help provide seamlessly code, debug, and manage application and provide a consisten, isolated environment for working with our web applications.

## Optional Downloads

- ### [Git](https://git-scm.com/)
  - This is an optional download as we can utilize the VSCode terminal to run our web applications, but if you prefer using git bash and do not have it downloaded, you can use the link above to download git.
