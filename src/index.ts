import express, {Request, Response} from 'express';
import cors from 'cors';
import { routes} from './routes';
import { Connection, createConnection } from "typeorm";

createConnection().then(connection => {
    
    /** Create express app */
    const app = express();

    app.use(express.json());
    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    }));

    routes(app);

    /** Listen to specific port */
    app.listen(5000, () => {
        console.log("Listening to port 5000")
    })
});