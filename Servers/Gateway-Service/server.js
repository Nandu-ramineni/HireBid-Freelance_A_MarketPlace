import app from "./app.js";
import config from './Config/env.js';
const { port } = config;

app.listen(port, () => {
    console.log(`Gateway service is running on port ${port}`);
});