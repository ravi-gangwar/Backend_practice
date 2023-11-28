import express from "express";
import authRouter from "./router/authRoute.js"
import dbConnection from "./config/DbConnection.js";


const app = express();
dbConnection();

app.use(express.json());
app.use("/api/auth/", authRouter)

app.use('/', (req, res)=>{
    res.status(200).json({data : 'JWTauth server'});
})


export default app;