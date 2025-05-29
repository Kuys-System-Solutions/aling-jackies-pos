# Aling Jackie's POS and Inventory

### Setup

1. In `server` (no need to `cd` into the directory):

- create a virtual environment with `python3 -m venv .venv`
- activate the virtual environment with `source .venv/bin/activate` (`.venv/Scripts/activate` for Windows)
- go to the directory of requirements.txt `cd server`
- install dependencies with `pip install -r requirements.txt`
- go to root directory `cd ..`
- initialize database with `python -m server.init_db` (incidentally, you can wipe the database with `python -m server.wipe_db`)
- go to the directory of requirements.txt `cd server`
- run Flask server with `python3 app.py`

2. In `client` (remember to run `cd client` first):

- install dependencies with `npm i`
- run server with `npm run dev`

### Guide

Both servers need to be active at the same time for the application to function as a whole. However, frontend and backend development can be done separately (theoretically). Dummy data can be used temporarily for frontend development, while backend development can be done with API tools like REST Client.

The frontend and backend communicate with JSON using an API whose endpoints are defined in `app.py`. Ideally, this API should be as REST-like as possible (statelessness, use of appropriate HTTP methods like PUT/PATCH for updates, DELETE for deletions, POST for additions, etc.).

Refer to `./server/testing.http` for API endpoint testing. Use API tools like cURL, Postman, or REST Client (recommended) to test non-GET HTTP methods.

Refer to `./client/src/App.jsx` to see app routes. Routing between pages hasn't been implemented yet.


ORDERS
--- spaghetti               100 PHP
|____ gawing carbonara
--- carbonara               100 PHP
|____ gawing spaghetti