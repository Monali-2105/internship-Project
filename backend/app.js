import express from "express";
import products from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js"
import order from "./routes/orderRoutes.js"

import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileupload());

app.use("/api",products);
app.use("/api",user);
app.use("/api",order);

app.use(errorMiddleware);

export default app;