# luminave-server

Provide an API for the luminave frontend and everything that wants to use luminave

[![Build Status](https://travis-ci.org/NERDDISCO/luminave-thoserverrium.svg?branch=master)](https://travis-ci.org/NERDDISCO/luminave-server)

## Table of Contents

<!-- toc -->

- [luminave-server](#luminave-server)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Config](#config)
    - [Example .env](#example-env)
  - [Use with luminave & Thorium](#use-with-luminave--thorium)

<!-- tocstop -->

---

## Setup

* Clone [this repository](https://github.com/NERDDISCO/luminave-server)
* Install the dev dependencies by executing `npm install` inside the repository
* Start the server with `npm start`

---

## Config

If you want to change the `host` & `port` of the luminave-server, you have to create a `.env` file inside the luminave-server folder. 

### Example .env

```
HOST=localhost
PORT=4000
```

---

## Use with luminave & Thorium

* Start [luminave-server](https://github.com/NERDDISCO/luminave-server) with `npm start`
* Start [Thorium server](https://github.com/Thorium-Sim/thorium) with `npm start`
* Start [luminave-thorium](https://github.com/NERDDISCO/luminave-thorium) with `npm start`
* Create a flight in Thorium at http://localhost:3000
* Add the luminave-thorium as a client to the created flight
  * This is only possible because luminave-thorium has the word `ECS` in it's Thorium-clientId (which is the default in `luminave-thorium/src/constans/index.js`))
* In the Thorium interface: Go to Core
  * On the left you can find a radar, the light controls are directly underneath
  * Change a color an see it also changed in luminave in an auto-generated animation
* In the luminave interface: Open the navigation on the right
  * Find the `luminave-server` headline
  * Set the URL using the `host` & `port` configured for the luminave-server (default is `ws://localhost:4000/graphql`)
  * Click on the **connect** button
  * The icon besides the URL input should show a ❤️ emoji, if not then it will display an error message
    * More detailed error message will be visible in the dev console of the browser
