import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5001;
import app from "./app.js";

app.listen(PORT, ()=> {
    console.log(`Server Listening on http://localhost:${PORT}/`.bgMagenta.black);
})