# Examify

This project was developer with Nodejs, express, sequelize (POSTGRES).

## Installation

1. Clone repository - `$ git clone https://github.com/klefcodes/examify.git`
2. Move to the directory - `$ cd examify`

3. Create a new file `.env` in `config` directory. if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.

4. Install dependencies `$ yarn`.

## Running the server locally

1. Run a migration and seed sample data - Run `yarn db:migrate && yarn db:seeds`

2. Start up the server - Run `yarn start` | `yarn dev`

3. Server should be running on http://localhost:3333 by default

## Routes

| Routes                             | Description        | Payload                                                                                                                                                             |
| ---------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GET] &nbsp; /                     | Get /              | none                                                                                                                                                                |
| [GET] &nbsp; /api/questions        | Get all questions  | none                                                                                                                                                                |
| [POST] &nbsp; /api/questions       | Create a question  | `{ question: 'What is capital of France', options: [ { text: "Berlin" },{text: "Paris",correct: true }, { text: "Amsterdam" }, { text: "Abuja" }, category_id: 1]}` |
| [PATCH] &nbsp; /api/questions/:id  | Edit a question    | `{ question: 'What is the result of 2 + 2', options: [ { text: "4", correct: true }, { text: "6" }, { text: "8" }, { text: "10" }, category_id: 1]}`                |
| [DELETE] &nbsp; /api/questions/:id | Delete a question  | none                                                                                                                                                                |
| [GET] &nbsp; /api/category         | Get all categories | none                                                                                                                                                                |
