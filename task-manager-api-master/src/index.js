const express = require('express');
require('./db/mongoose');
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port)
}); 
