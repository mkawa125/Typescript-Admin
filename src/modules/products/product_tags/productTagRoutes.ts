import { CreateProductTag, DeleteProductTag, GetProductTag, productTags, UpdateProductTag } from './productTagController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const productTagRoutes = (router: Router) => {
    router.get('/api/product-tags', AuthMiddleware, productTags);
    router.post('/api/product-tags/create', AuthMiddleware,  CreateProductTag);
    router.get('/api/product-tags/:id', AuthMiddleware, GetProductTag);
    router.put('/api/product-tags/:id', AuthMiddleware, UpdateProductTag);
    router.delete('/api/product-tags/:id', AuthMiddleware, DeleteProductTag);
}