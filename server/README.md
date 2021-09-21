# Audioly

This project was developer with Nodejs, express and MongoDB.

## Installation

1. Clone repository - `$ git clone https://github.com/klefcodes/audioly.git`
2. Move to the directory - `$ cd audioly/server`

3. Create a new file `.env` inside of the `root` directory. if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.

4. Install dependencies `$ npm install`.

## Running the server locally

1. Start up the server - Run `npm start` | `npm run dev`

2. Server should be running on http://localhost:3333 by default

## Routes

| Routes                        | Description             | Auth | Payload                                                 |
| ----------------------------- | ----------------------- | ---- | ------------------------------------------------------- |
| [POST] &nbsp; /user/register  | Create a new account    | ---  | firstName, lastName, dob, interests, username, password |
| [POST] &nbsp; /user/login     | User sign in            | ---  | username, password                                      |
| [POST] &nbsp; /audio          | Upload an audio track   | True | file, caption                                           |
| [GET] &nbsp; /audio           | Get all audio tracks    | ---  | ---                                                     |
| [GET] &nbsp; /audio/:filename | Render audio to browser | ---  | ---                                                     |
