# social-media-api
    
## Table of Contents
1. [Description](#description)
2. [Installation](#installation)    
3. [Usage](#usage)
4. [Demo](#demo)
5. [Screenshot](#screenshot)
6. [Contact](#contact)


## Description

This project is the back end code for a social media api. It features a mongoDB database using mongoose. The basic features of a social media website are included such as the adding and removal of friends, posts (referred to as thoughts), and comments (referred to as reactions). The database will dynamically update and change based on the adding of friends, thoughts, and reactions. The criteria for this project specified only an addition of a friend on one side. I changed that to reflect a more realistic situation where each user is added to eachothers friend request. As well, deleting a user (according to mvp) would only delete that user and their thoughts, friends, and reactions would persist. In order to remedy that, on user deletion their thoughts, friends, and reactions are all removed. In the same respect removal of friends will consequently remove friends from both the user and their friend providing a cascade deletion type effect. 

* The user routes are as follows, get all users, get user by id, create user, update user, and delete user.
* Friend routes include adding and removal of a friend.
* The thought routes are get all, get by id, create, update and delete.
* Finally there is a route to add, and one to delete a reaction.

## Installation

* First the required dependencies must be installed by navigating to the terminal in the social-media-api directory and typing "npm install".
* Next the database can be seeded with default users by typing the command "npm run seed". (Not neccesary to function)
* Afterwords the command "npm run start" or "nodemon index.js" can be used to boot up the server.

### Usage

Start the server and then make requests with insomnia to test out the functionality of this database.
    
### Demo

Demonstration Video: 

[![Demonstration Video](https://cdn0.iconfinder.com/data/icons/multimedia_iconset/256/button_play.png)](https://drive.google.com/file/d/1XDWRjwB5tFn4rXRsFeO2SRbuxLgiEGu3/view)

### Screenshot:

![screenshot](https://user-images.githubusercontent.com/66131189/206571562-18d932f5-5c1c-4d19-bf65-c6336335818d.JPG)


#### Contact

See my repositories at [Github Profile](https://github.com/rjewell859)

Email me with additional questions at headwallforest27@gmail.com
