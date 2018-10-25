[![CircleCI](https://circleci.com/gh/Betty-Kebenei/the-challenger-rest-api/tree/master.svg?style=svg)](https://circleci.com/gh/Betty-Kebenei/the-challenger-rest-api/tree/master)

# The Challenger REST API

This is a REST API built using nodeJS, Express, and MongoDB.

This API is used to keep track of the record of individual who are on a journey of creating a discipline of consistent Bible reading. Keeping track of their daily riser time and chapters of the Bible read; if the took notes, prayed and did scripture memory.

## Getting Started

### Prerequisites
You need the following installed/setted-up so as to get the software running:

1. Node

2. ExpressJs

3. Mongoose

4. Body-parser

### Installing
Clone the repo by running

> git clone https://github.com/Betty-Kebenei/the-challenger-rest-api.git

Navigate to the directory containing the project.

Then run the following command to install other required dependencies after cloning:

> npm intsall

## Environment Variables Set-up

## Running the tests

Navigate to the root of the application then run:

> npm test

## Run the application

Navigate to the root of the application

Run the following commands:

> npm start

## Endpoints

An endpoint that has public access as false can only be accessed after a token based authentication. 

| METHOD | ENDPOINT | PUBLIC ACCESS | SUMMARY |
| --- | --- | --- | --- |
| **POST** | /api/v1/signup | TRUE | A user can register |
| **POST** | /api/v1/signin | TRUE | An already registered user can login |
| **PUT** | /api/v1/profile | FALSE | A user update his/she profile |
| **GET** | /api/v1/user | FALSE | A user can get their profile information |
| **POST** | /api/v1/month-form | FALSE | A user can create a month form |
| **GET** | /api/v1/month-form | FALSE | A user can get all of his/her month forms |
| **GET** | /api/v1/month-form/{monthId} | FALSE | A user can get a month form by id |
| **PUT** | /api/v1/month-form/{monthId} | FALSE | A user can update a month form by id |
| **POST** | /api/v1/month-form/{monthId}/daily-data | FALSE | A user can add daily data to a month form |
| **GET** | /api/v1/month-form/{monthId}/daily-data | FALSE | A user can get all daily data in a month form |
| **GET** | /api/v1/month-form/{monthId}/daily-data/{dailyId} | FALSE | A user can get a daily data in a month form |
| **PUT** |/api/v1/month-form/{monthId}/daily-data/{dailyId} | FALSE | A user can update a daily data in a month form |

## Documentation


## Deployed
