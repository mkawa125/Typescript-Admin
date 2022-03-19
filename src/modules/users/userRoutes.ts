import { Users, CreateUser } from './userController';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { Router } from "express";


export const userRoutes = (router: Router) => {
    router.get('/api/users', AuthMiddleware, Users);
    router.post('/api/users/create', AuthMiddleware, CreateUser);
}