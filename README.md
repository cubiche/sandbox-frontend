# Sandbox frontend

The sandbox frontend project is a how-to example for implementing a DDD application using [cubiche](https://github.com/cubiche/cubiche) library.

This project implements a conference management system, an example taken from the books "Microservices for everyone" (2017) by Matthias Noback and "Exploring CQRS and Event Sourcing" (2012) by Dominic Betts.

The project contains a frontend page and a dashboard application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Open a terminal and follow the [instrucctions](https://github.com/cubiche/sandbox-ap/blob/master/README.md) to have the API project running.
Open another terminal and clone the repository.

```bash
git clone git@github.com:cubiche/sandbox-frontend.git
```

### Installing

```bash
cd sandbox-frontend
npm install
npm run dev
```

**Important Note:**
```code
To be able to run the frontend application the API application must be running
```
## Tests

### Running all the unit tests suite

```bash
npm run test
```

### Running all the tests coverage

```bash
npm run coverage
```

## Built With

* [NextJS](http://symfony.com/) - A server-rendered framework for React apps
* [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [Redux Saga](https://redux-saga.js.org/)

## License

Sandbox frontend is completely free and released under the [MIT License](https://github.com/cubiche/cubiche/blob/master/LICENSE).

## Authors

* [Ivan Suárez Jerez](https://github.com/ivannis)