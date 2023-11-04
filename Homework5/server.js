const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 80;

const routes = require('./src/routes');
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));