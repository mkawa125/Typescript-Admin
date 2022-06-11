import { productLabels, CreateproductLabel, GetproductLabel, UpdateproductLabel, DeleteproductLabel, uploadImage } from './productLabelController';
import express, { Router } from "express";
import { AuthMiddleware } from '../../../middleware/auth.middleware';

export const productLabelRoutes = (router: Router) => {
    router.get('/api/product-labels', AuthMiddleware, productLabels);
    router.post('/api/product-labels/create', AuthMiddleware,  CreateproductLabel);
    router.get('/api/product-labels/:id', AuthMiddleware, GetproductLabel);
    router.put('/api/product-labels/:id', AuthMiddleware, UpdateproductLabel);
    router.delete('/api/product-labels/:id', AuthMiddleware, DeleteproductLabel);
}