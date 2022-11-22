# social-media-api
    
## Table of Content
[Description](#description)
[Installation](#installation)    
[Usage](#usage)
[Demo](#demo)
[Contact](#contact)


## Description

This project is the back end code for a social media api. It features a mongoDB database using mongoose. The basic features of a social media website are included such as the adding and removal of friends, posts (referred to as thoughts), and comments (referred to as reactions). The database will dynamically update and change based on the adding of friends, thoughts, and reactions. As well removal of friends will consequently remove friends from both the user and their friend. In the same respect on user deletion their thoughts, friends, and reactions are all removed. 

## Installation

* First the required dependencies must be installed by navigating to the terminal in the social-media-api directory and typing "npm install".
* Next the database can be seeded with default users by typing the command "npm run seed". (Not neccesary to function)
* Afterwords the command "npm run start" or "nodemon index.js" can be used to boot up the server.

### Usage

Start the server and then make requests with insomnia to test out the functionality of this database.
    
### Demo

Demonstration Video: 

[![Demonstration Video](data:image/png;base64,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)](https://drive.google.com/file/d/1ugv5a1qOp4ntTCxnYP4vnvaYFUuUnnlu/view "Demo")


#### Contact

See my repositories at [Github Profile](https://github.com/rjewell859)

Email me with additional questions at headwallforest27@gmail.com
