# Backend Flutter F-Code

## Instruction 
Clone this repo: 
`$ git clone https://github.com/oHTGo/Backend-Flutter`

## Setup Project: 
Install Yarn: `$ npm install yarn -g`

Install dependencies: `$ yarn`

Create a file called `.env` and `ormconfig.env` with the content taken from `.env.example` and `ormconfig.env.example` in folder `env_example`

## Setup Docker
Setup Docker: Google

Run `$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d` and wait for docker to run the container

## Setup Postman API
- Import 2 files:
`Backend Environments.postman_environment.json` and `Backend-Flutter.postman_collection.json`
- Edit `variable environments` in Postman: `host`, `port`, `version` and some other variables
- Use `API`
