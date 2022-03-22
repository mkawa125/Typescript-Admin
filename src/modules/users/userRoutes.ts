import { Users, CreateUser, GetUser, UpdateUser, DeleteUser } from './userController';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { Router } from "express";

export const userRoutes = (router: Router) => {
    router.get('/api/users', AuthMiddleware, Users);
    router.post('/api/users/create', AuthMiddleware, CreateUser);
    router.get('/api/users/:id', AuthMiddleware, GetUser);
    router.put('/api/users/:id', AuthMiddleware, UpdateUser);
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser);
}