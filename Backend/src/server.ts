import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { autoMigrate } from "./Infrastructure/Database/AutoMigrate";

autoMigrate();

const app = createApp();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

server.timeout = 300000; // Set timeout to 5 minutes (300,000 milliseconds)
