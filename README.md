# Aling Jackie's POS and Inventory

### Setup

1. In `server`:

- create a virtual environment with `python -m venv .venv`
- activate the virtual environment with `source .venv/bin/activate` (`.venv/Scripts/activate` for Windows)
- install dependencies with `pip install -r requirements.txt`
- initialize database with `python db.py` (incidentally, you can wipe the database with `python db.py wipe`)
- run Flask server with `python app.py`

2. In `client`:

- install dependencies with `npm i`
- run server with `npm run dev`

### Guide

Both servers need to be active at the same time for the application to function as a whole.

The frontend and backend communicate using an API whose endpoints are defined in `app.py`. Ideally, this API should be as REST-like as possible (statelessness, use of appropriate HTTP methods like PUT/PATCH for updates, DELETE for deletions, POST for additions, etc.).

Refer to `./server/testing.http` for API endpoint testing. Use tools like cURL, Postman, or REST Client (recommended) to test non-GET HTTP methods.

Refer to `./client/src/App.jsx` to see app routes. Routing between pages hasn't been implemented yet.
