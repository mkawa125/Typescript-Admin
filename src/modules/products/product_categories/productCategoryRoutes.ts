import { productCategories, CreateProductCategory, GetProductCategory, UpdateProductCategory, DeleteProductCategory } from './productCategoryController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const productCategoryRoutes = (router: Router) => {
    router.get('/api/product-categories', AuthMiddleware, productCategories);
    router.post('/api/product-categories/create', AuthMiddleware,  CreateProductCategory);
    router.get('/api/product-categories/:id', AuthMiddleware, GetProductCategory);
    router.put('/api/product-categories/:id', AuthMiddleware, UpdateProductCategory);
    router.delete('/api/product-categories/:id', AuthMiddleware, DeleteProductCategory);
}