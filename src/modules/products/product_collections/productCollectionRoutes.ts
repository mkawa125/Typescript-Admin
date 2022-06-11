import { productCollections, CreateProductCollection, GetProductCollection, UpdateProductCollection, DeleteProductCollection } from './productCollectionController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const productCollectionRoutes = (router: Router) => {
    router.get('/api/product-collections', AuthMiddleware, productCollections);
    router.post('/api/product-collections/create', AuthMiddleware,  CreateProductCollection);
    router.get('/api/product-collections/:id', AuthMiddleware, GetProductCollection);
    router.put('/api/product-collections/:id', AuthMiddleware, UpdateProductCollection);
    router.delete('/api/product-collections/:id', AuthMiddleware, DeleteProductCollection);
}