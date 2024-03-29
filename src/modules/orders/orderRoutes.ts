import { Orders, ExportCsv, Chart } from './orderController';
import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.middleware";

export const orderRoutes = (router: Router) => {
    router.get('/api/orders', AuthMiddleware, Orders);
    router.post('/api/orders/export', AuthMiddleware, ExportCsv);
    router.get('/api/orders/report', AuthMiddleware, Chart);

}