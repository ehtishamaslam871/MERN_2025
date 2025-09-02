require('dotenv').config();
const express = require('express');
const cors = require("cors")
const app = express();
const contactRouter = require("./router/contact-router");
const authRouter = require("./router/auth-router");
const connectDB = require("./utilities/db");
const errorMiddleware = require("./middleware/error-middleware");

const coreOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(coreOptions));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);}
    );
});