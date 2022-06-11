import { productAttributeSets, CreateProductAttributeSet, GetProductAttributeSet, UpdateProductAttributeSet, DeleteProductAttributeSet } from './productAttributeSetController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const productAttributeSetRoutes = (router: Router) => {
    router.get('/api/product-attribute-sets', AuthMiddleware, productAttributeSets);
    router.post('/api/product-attribute-sets/create', AuthMiddleware,  CreateProductAttributeSet);
    router.get('/api/product-attribute-sets/:id', AuthMiddleware, GetProductAttributeSet);
    router.put('/api/product-attribute-sets/:id', AuthMiddleware, UpdateProductAttributeSet);
    router.delete('/api/product-attribute-sets/:id', AuthMiddleware, DeleteProductAttributeSet);
}