# MediLedger Online

This project is now structured as a real online medical store app with a `Node.js` backend. It supports:

- local file storage with `sql.js`
- hosted PostgreSQL storage through `DATABASE_URL`

## Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database:
  - local: `sql.js` persisted to `data/mediledger.sqlite`
  - online: PostgreSQL through `DATABASE_URL`
- Authentication: cookie-based login session

## Features

- Server-backed login with default admin account
- Medicines, suppliers, sales, settings, and backups stored on the server
- Shared data across devices when hosted online
- English and Dari interface support
- Printable invoices
- Percentage-based sale discounts

## Default Login

- Username: `admin`
- Password: `admin123`

Change the password after first login.

## Setup

1. Install Node.js on this machine.
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000`

You can also just double-click [Launch-MediLedger.cmd](C:\Users\Computer Arena\Documents\New project\Launch-MediLedger.cmd). It will install dependencies the first time if needed, then start the server and open the app in your browser.

If you want to run against Neon locally, put your values in `.env`. This project already reads `PORT`, `JWT_SECRET`, and `DATABASE_URL` from that file.

## Important Files

- [server.js](C:\Users\Computer Arena\Documents\New project\server.js): Express API and database setup
- [package.json](C:\Users\Computer Arena\Documents\New project\package.json): Node dependencies
- [app.js](C:\Users\Computer Arena\Documents\New project\app.js): frontend logic using API calls
- [index.html](C:\Users\Computer Arena\Documents\New project\index.html): main UI
- [render.yaml](C:\Users\Computer Arena\Documents\New project\render.yaml): Render deployment config
- [.env.example](C:\Users\Computer Arena\Documents\New project\.env.example): environment variable template

## Hosting

Recommended free setup:

1. Create a free PostgreSQL database on Neon
2. Copy the Neon connection string
3. Deploy this project to Render
4. In Render, set `DATABASE_URL` to the Neon connection string
5. In Render, set `JWT_SECRET` to a strong random secret
6. Deploy and open your Render app URL

Alternative no-card setup:

1. Push this repo to GitHub
2. In Koyeb, create a Web Service from the GitHub repo
3. Use the `buildpack` builder
4. Set the build command to `npm install`
5. Set the run command to `npm start` or rely on [Procfile](C:\Users\Computer Arena\Documents\New project\Procfile)
6. Add `DATABASE_URL` and `JWT_SECRET` in Koyeb environment variables
7. Deploy and open the `*.koyeb.app` URL

Before production deployment, you should:

1. Set a strong `JWT_SECRET`
2. Use HTTPS
3. Use PostgreSQL instead of local file storage
4. Back up your hosted database regularly

## Note

If Node.js was installed very recently and `node` is not yet available in a terminal, close and reopen the terminal or use [Launch-MediLedger.cmd](C:\Users\Computer Arena\Documents\New project\Launch-MediLedger.cmd), which also checks the common install path at `C:\Program Files\nodejs`.
