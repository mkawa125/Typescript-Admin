import { Customers, CreateCustomer, GetCustomer, UpdateCustomer, DeleteCustomer } from './customerController';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { Router } from "express";

export const customerRoutes = (router: Router) => {
    router.get('/api/customers', AuthMiddleware, Customers);
    router.post('/api/customers/create', AuthMiddleware, CreateCustomer);
    router.get('/api/customers/:id', AuthMiddleware, GetCustomer);
    router.put('/api/customers/:id', AuthMiddleware, UpdateCustomer);
    router.delete('/api/customers/:id', AuthMiddleware, DeleteCustomer);
}