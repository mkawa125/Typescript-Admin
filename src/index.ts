import { userRoutes } from './modules/users/userRoutes';
require('dotenv').config();

import express, {Request, Response} from 'express';
import cors from 'cors';
import { routes} from './routes';
import { Connection, createConnection } from "typeorm";
import cookieParser from 'cookie-parser';
import { permissionRoutes } from './modules/auth/permissions/permissionRoutes';

createConnection().then(connection => {
    
    /** Create express app */
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    }));

    routes(app);
    userRoutes(app);
    permissionRoutes(app);

    /** Listen to specific port */
    app.listen(5000, () => {
        console.log("Listening to port 5000")
    })
});