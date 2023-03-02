const connectDatabase = require('./config/db');
const app = require("./app");

connectDatabase();

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Server working on http://localhost:${PORT}`);
})


//Unhandled promise rejection   (If any connection string or any server related error)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})
