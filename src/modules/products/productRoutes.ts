import { Products, CreateProduct, GetProduct, UpdateProduct, DeleteProduct, uploadImage } from './productController';
import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import multer from 'multer';
import { extname } from 'path';
import { Request, Response } from "express"


export const productRoutes = (router: Router) => {
    router.get('/api/products', AuthMiddleware, Products);
    router.post('/api/products/create', AuthMiddleware, CreateProduct);
    router.get('/api/products/:id', AuthMiddleware, GetProduct);
    router.put('/api/products/:id', AuthMiddleware, UpdateProduct);
    router.delete('/api/products/:id', AuthMiddleware, DeleteProduct);

    router.post('/api/products/upload', AuthMiddleware, uploadImage);
}