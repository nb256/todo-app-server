<h1 align="left">Instructions</h1>

<h2 align="left">Start application</h2>
<br>

1. Start the server and the database:
```
    docker-compose up -d
```

<h2 align="left">Start application for development</h3>
<br>

1. Install [Node.js](https://nodejs.org/en/download/)


2. Install pnpm:
```
    npm install -g pnpm
```

3. Install packages:
```
    pnpm install
```

4. Start the server and the database:
```
    pnpm docker:up
```

5. Stop the container of the server


6. Run dev command:
```
    pnpm dev
```

Application server runs at http://localhost:8080
<h2 align="left">Run tests</h2>
<br>

1. 1st, 2nd and 3rd steps of "Start application for development" are required.

2. Run tests:
```
    pnpm test
```