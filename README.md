# luminave-server

Provide an API for the luminave frontend and everything that wants to use luminave

[![Build Status](https://travis-ci.org/NERDDISCO/luminave-thoserverrium.svg?branch=master)](https://travis-ci.org/NERDDISCO/luminave-server)

## Table of Contents

<!-- toc -->

- [luminave-server](#luminave-server)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Testing](#testing)
  - [API Documentation](#api-documentation)

<!-- tocstop -->

---

## Setup

* Clone [this repository](https://github.com/NERDDISCO/luminave-server)
* Install the dev dependencies by executing `npm install` inside the repository

---

## Testing

* Start the Thorium server with `npm start`
* Start luminave-thorium with `npm start`
* Create a flight at http://localhost:3000
* Make sure that luminave-thorium has the word "ECS" in it's clientId (can be changed in the `index.js`)
* Add the luminave-thorium as a client to the created flight
* In the Thorium interface: Go to Core

---

## API Documentation

Can be found on [API documentation](docs/API.md).
