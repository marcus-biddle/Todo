import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1', todoRoutes);

// const url = `mongodb+srv://${process.env.MONGO_USER}:${process.envMONGO_PASSWORD}@cluster0.x3g5qvq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
// const options = { useNewUrlParser: true, useUnifiedTopology: true };

const startServer = async () => {
    try {
        mongoose.set('strictQuery', true);

        mongoose.connect(process.env.MONGO_URL)
            .then (() => 
                app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
            )
            .catch(err => {
                throw err;
            })
    } catch(err) {
        throw err
    }
}

startServer();
