import { Products, CreateProduct, GetProduct, UpdateProduct, DeleteProduct, uploadImage } from './productController';
import express, { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.middleware";

export const productRoutes = (router: Router) => {
    router.get('/api/products', AuthMiddleware, Products);
    router.post('/api/products/create', AuthMiddleware, CreateProduct);
    router.get('/api/products/:id', AuthMiddleware, GetProduct);
    router.put('/api/products/:id', AuthMiddleware, UpdateProduct);
    router.delete('/api/products/:id', AuthMiddleware, DeleteProduct);

    // TODO fix static routes
    router.post('/api/products/upload', AuthMiddleware, uploadImage);
    router.use('/api/products/upload', express.static('./uploads'));

}