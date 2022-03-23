import { getRoles } from './roleController';
import { AuthMiddleware } from '../../../middleware/auth.middleware';
import { Router } from "express";


export const roleRoutes = (router: Router) => {
    router.get('/api/roles', AuthMiddleware, getRoles);
}