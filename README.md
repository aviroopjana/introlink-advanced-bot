# Introlink Advanced Bot

## Overview

IntroLink is an advanced Telegram bot built using Node.js, leveraging the `mtproto-core` and `Telegraf` libraries. This bot facilitates user interactions through various commands, enabling core features such as user authentication and group creation with ease.

## Features

- **User-Friendly Interaction**: Start the bot with `/start` to view available commands and options.
- **User Authentication**: Users can log in with `/login`and register to interact with the bot.
- **Group Creation**: Easily create Telegram groups using the `/group` command.

## Backend Architecture

The bot operates on a three-component architecture:

1. **Telegram API Server**: Manages the communication between users and the bot.
2. **Node.js Server**: Handles requests, processes commands, and interacts with the Telegram MTProto API.
3. **Telegram Client/User**: The end-user interface for interacting with the bot.

![Bot Logo](https://drive.google.com/uc?export=download&id=1NoxwHpyxA2vUwJrYmxYvrwQD5Wnz58NB)

## Utils Directory

The `utils` directory contains utility functions that support various functionalities of the bot. These utilities help in keeping the code modular and maintainable. Here’s a brief overview of each file:

- **getPhoneNumber.js**: This utility handles the logic for retrieving and validating user phone numbers during the authentication process. It ensures that the phone number format is correct and prepares it for use in API calls.

- **getUser.js**: This utility fetches user information from the Telegram API. It is used to retrieve user details based on the provided user ID, facilitating personalized interactions.

- **messageHandler.js**: This file contains the logic for handling incoming messages. It processes commands such as `/start`, `/login`, and `/group`, routing them to the appropriate command handlers while managing the flow of user interactions.

- **messageTracker.js**: This utility tracks outgoing messages to ensure that the bot can monitor its responses and any updates related to those messages. This is particularly useful for managing asynchronous operations and handling user responses effectively.

## Services Directory

The `services` directory encapsulates the core functionalities that interact with the Telegram API and handle the bot’s operations. It acts as an intermediary between the commands and the Telegram server. Here’s a summary of each service:

- **mtprotoService.js**: This service interacts with the MTProto API, which is essential for the bot's operation. It includes methods for making API calls, managing sessions, and handling responses from the Telegram server. Functions in this file are responsible for user authentication, sending messages, and creating groups.

- **telegramService.js**: This service contains methods specific to the Telegram bot's operations. It manages tasks such as formatting messages, handling user data, and facilitating communication with the Telegram client. This separation helps keep the code organized and allows for easier maintenance and updates.


## Installation

To set up the project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aviroopjana/introlink-advanced-bot
   cd introlink-advanced-bot
2. **Install Dependencies**
    ```bash
    npm install
3. **Set Up Environment Variables**
   <br> Create a .env file in the root directory and add the required environment variables. You can refer to the .env.example file for the necessary variables.

4. **Run the Application**
    <br> Start the server with:
   ```bash
   node src/main.js
