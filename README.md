
# Master Incident Log [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

1. [Usage](#usage)
3. [Installation](#installation)
2. [Features](#features)
4. [Contributions](#contributions)

## Usage

The Master Incident Log is an event tracker using JavaScript. It allows users to communicate important events, search for trends, and maintain communication between team members of different shifts. Team blockers can be identified quickly by reading the current day's events.

## Installation


In order to get started, fork this scaffold repository in Github and clone it locally onto your machine.

### The Local Setup
* **OPTIONAL:** fork your own copy of the main repo
* clone the repo
* navigate to the local directory housing your repo
```
$ git repo clone Harkerfield/sdi-blended-full-stack-project-scaffold
$ cd ../path/to/the/local/repo
```

### The Database Server
* navigate from the repo's local directory to the `server` subfolder
* run `npm install` to install all necessary dependencies
* run `npm run dev` to start up the database server
* navigate to `localhost:3000/` in your local browser to view database requests
* **NOTE:** the database by default will run on your local host at port 3000
```
$ cd server
$ npm install
$ npm run dev
```

### The User Application
* navigate from the repo's local directory to the `client` subfolder
* run `npm install` to install all necessary dependencies
* run `npm start` to start up the application
* navigate to `localhost:3000/` in your local browser to view the application
* **NOTE:** the application by default will run on your local host at port 3000
```
$ cd client
$ npm install
$ npm start
```

## Features

### User Login
Product users are able to authenticate themselves to the system by providing their system username and password. If a user does not have an account, they can create one. Access control is enforced by account.

### User View
Users can view existing logs optionally filtered and ordered as they choose. The order defaults to most recent. The filter defaults to none. Users are provided a summarized view of all posts, and when selected the post view expands to show the post in full detail.

### Post Creation
Users can create a post to represent an incident that is desired to be communicated to other users. Time and date values for the post are unchangeable to maintain post log integrity. The user can create a title and description for their post. Before submitting, a post can be assigned short description "tags" to be better organized with existing posts.

### Template Creation
Users can create a template of a post to save time when making future posts. Post attributes including current title, description, and tags are saved to the template whent he post template is made. 

### Post Searching
Search capabilities allow the database of posts to be filtered by inclusion or exclusion of keywords in the title and description, post tags, and dates.

## Contributions

### Sponsor
Master Incident Log is brought to you by The Sorcerer's Guild, where you too can learn to wield the wonders of magic:
* **Arcanum** @ https://github.com/Harkerfield/sdi-blended-project2-scaffold

### Code Authors
To see more paragons of programming, check out the project contributors:
* **David Bonilla** @ https://github.com/ddbonilla
* **Jacob Steward** @ https://github.com/JacobTheEldest
* **Jason Martin** @ https://github.com/JasonMartin85
* **Joseph Hartsfield** @ https://github.com/Harkerfield
* **Kyle Hackett** @ https://github.com/hackek
