import { Orders, ExportCsv } from './orderController';
import express, { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.middleware";

export const orderRoutes = (router: Router) => {
    router.get('/api/orders', AuthMiddleware, Orders);
    router.get('/api/orders/export', AuthMiddleware, ExportCsv);
    // router.post('/api/orders/create', AuthMiddleware, CreateProduct);
    // router.get('/api/orders/:id', AuthMiddleware, GetProduct);
    // router.put('/api/orders/:id', AuthMiddleware, UpdateProduct);
    // router.delete('/api/orders/:id', AuthMiddleware, DeleteProduct);

}