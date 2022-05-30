import { orderRoutes } from './modules/orders/orderRoutes';
import { productRoutes } from './modules/products/productRoutes';
import { userRoutes } from './modules/users/userRoutes';

import express, {Request, Response} from 'express';
import cors from 'cors';
import { routes} from './routes';
import { Connection, createConnection } from "typeorm";
import cookieParser from 'cookie-parser';
import { permissionRoutes } from './modules/auth/permissions/permissionRoutes';
import { roleRoutes } from './modules/auth/roles/roleRoutes';

createConnection().then(connection => {
    
    /** Create express app */
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: process.env.ORIGINS.split(","),
    }));

    /** Include external routes */
    routes(app);
    userRoutes(app);
    permissionRoutes(app);
    roleRoutes(app);
    productRoutes(app);
    orderRoutes(app);

    /** Listen to specific port */
    const PORT = process.env.SERVER_PORT || 5000
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`)
    })
});