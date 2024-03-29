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
import { brandRoutes } from './modules/products/brands/brandRoutes';
import { productLabelRoutes } from './modules/products/product_lables/productLabelRoutes';
import { productTagRoutes } from './modules/products/product_tags/productTagRoutes';
import { productCollectionRoutes } from './modules/products/product_collections/productCollectionRoutes';
import { productCategoryRoutes } from './modules/products/product_categories/productCategoryRoutes';
import { productAttributeSetRoutes } from './modules/products/product_attribute_sets/productAttributeSetRoutes';
import { productAttributeRoutes } from './modules/products/product_attributes/productAttributeRoutes';
import { customerRoutes } from './modules/customers/customerRoutes';

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
    brandRoutes(app);
    productLabelRoutes(app);
    productTagRoutes(app);
    productCollectionRoutes(app);
    productCategoryRoutes(app);
    productAttributeSetRoutes(app);
    productAttributeRoutes(app);
    customerRoutes(app);

    /** Listen to specific port */
    const PORT = process.env.SERVER_PORT || 5000
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`)
    })
});