import { productAttributes, CreateProductAttribute, GetProductAttribute, UpdateProductAttribute, DeleteProductAttribute } from './productAttributeController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const productAttributeRoutes = (router: Router) => {
    router.get('/api/product-attributes', AuthMiddleware, productAttributes);
    router.post('/api/product-attributes/create', AuthMiddleware,  CreateProductAttribute);
    router.get('/api/product-attributes/:id', AuthMiddleware, GetProductAttribute);
    router.put('/api/product-attributes/:id', AuthMiddleware, UpdateProductAttribute);
    router.delete('/api/product-attributes/:id', AuthMiddleware, DeleteProductAttribute);
}