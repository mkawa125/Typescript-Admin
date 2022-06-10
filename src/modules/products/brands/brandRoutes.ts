import { Brands, CreateBrand, GetBrand, UpdateBrand, DeleteBrand, uploadImage } from './brandController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const brandRoutes = (router: Router) => {
    router.get('/api/brands', AuthMiddleware, Brands);
    router.post('/api/brands/create', AuthMiddleware,  CreateBrand);
    router.get('/api/brands/:id', AuthMiddleware, GetBrand);
    router.put('/api/brands/:id', AuthMiddleware, UpdateBrand);
    router.delete('/api/brands/:id', AuthMiddleware, DeleteBrand);

    // TODO fix static routes
    router.post('/api/brands/upload', AuthMiddleware, uploadImage);
    router.use('/api/brands/upload', express.static('./uploads'));

}