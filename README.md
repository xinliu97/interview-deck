# interview-deck

A tool for preparing technical interviews.

## Requirements

- [Node.js](https://nodejs.org/) 18 or higher

## Development

Install dependencies and start the development server:

```bash
cd client
npm install
npm run dev
```

The app will be served with hot reload at `http://localhost:5173` by default.

## Building for Production

To create a production build:

```bash
cd client
npm run build
```

You can then preview the build locally:

```bash
npm run preview
```

## Easy Deployment

A helper script `deploy.sh` is provided at the repository root. It installs dependencies, builds the client, and serves the production build using Vite:

```bash
./deploy.sh
```

This is useful for quickly verifying the built application.

## Backend Server

A minimal Express backend is included under the `server` directory. Install dependencies and start it with:

```bash
cd server
npm install
npm start
```

The server exposes a single endpoint `/api/questions` which returns the list of interview questions as JSON.

