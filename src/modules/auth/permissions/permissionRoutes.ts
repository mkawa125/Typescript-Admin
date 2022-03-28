import { getPermissions } from './permissionController';
import { AuthMiddleware } from '../../../middleware/auth.middleware';
import { Router } from "express";

export const permissionRoutes = (router: Router) => {
    router.get('/api/permissions', AuthMiddleware, getPermissions);
}