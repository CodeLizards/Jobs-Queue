# Jobs-Queue
A simple Jobs queue for user's requests for websites


## Table of Contents

1. [Requirements](#requirements)
1. [Tech Stack](#tech-stack)
1. [Tech Justifications](#tech-justifications-and-tradeoffs)
1. [API](#API-endpoints)
1. [Architecture](#high-level-architecture)


## Requirements

Node v5.8  
MongoDB
Redis

## Tech Stack
- [JQuery](https://jquery.com/)
- [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) and [Mongoose](http://mongoosejs.com/docs)
- [Redis](http://redis.io/)
- [CRON]
- [Mocha](https://mochajs.org/)

## Tech Justifications and Tradeoffs
- [External Modules] There are a variety of npm modules that encapsulate what this project was. Some examples are Kue, Bull, and Agenda. I considered using these but they have a lot of dependancies, and while modules like Kue are very feature rich, it is also a heavy codebase and I wanted to keep things lean and mean! Additionally, because the challenge was to build a job queue, I felt I could better show how I would make a job queue without using a library that already provided one. 
- [JQuery] I chose to keep the frontend simple and just use Javascript, HTML/CSS with Jquery for http requests because this was a backend heavy project and only needed two simple input fields and some text so it would have been unnecessary to use any sort of framework. 
- [Node/Express] I chose Node/Express because Node provides a very fast, lightweight and reliable server and allows me to write in full-stack javascript. 
- [Redis] I chose Redis because I wanted to have server side storage for my jobs queue. Redis, as a key value store, was perfect for the non relational data of each job which is just an id and a website to be processed. It is also very very fast and lightweight and it provided a list data structure which I used as a queue. 
- [MongoDB] I chose mongoDB because it was very fast to spin up and is very easy to use so it cuts development time. Also, I had no relational data so it was a good choice for just holding documents (website's html).
- [CRON] CRON was useful to have a background process running and poping things off of the queue in redis and storing them into the db. It is very light and fast and simple, so it is malliable to any sort of task. If this was a bigger project, I might have had it running on its on server instance so it was a background process independant of the primary server/api. 


### Setting up Mongo database and Redis:
(If you don't have Homebrew installed, go to http://brew.sh/ to install Homebrew.)
```sh
brew install mongodb
mongo
use mydb
```

### Starting the MongoDB server:

```sh
mongod
```

### Starting the Redis server:

```sh
redis-server
```

### Installing Testing Dependencies

From within the root directory:

```sh
npm install mocha -g
```

## Run Locally
'npm install'
'npm run dev'

or 
'npm install'
'redis-server'
'mongod'
'npm start'


Navigate your browser to localhost: 3000 to view the app.

### API Endpoints
There are two API endpoints that recieve websites for jobs and return status or data on job completion

| API Endpoint        | Type        | Description
| :------------- |:-------- |:-------- 
| /newWebsite      | POST | Expects an object with a key, "url" and a url {url: www.google.com} Returns the id if the website was added to the jobs queue. 
| /websiteStatus/:jobId | GET | Returns a JSON object with keys, "url", "id","_id", "content", containing the url requested, the jobId, and the html of the website if the job has been completed, otherwise it returns the status of the job |  


