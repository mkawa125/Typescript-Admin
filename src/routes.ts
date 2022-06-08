import { AuthMiddleware } from './middleware/auth.middleware';
import { Router } from "express";
import {Register, Login, AuthenticateUser, Logout, UpdateInfo, UpdatePassword, DeleteUser, SendEmaill} from "./controller/auth.controller"

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', AuthMiddleware, Logout);
    router.get('/api/user', AuthMiddleware, AuthenticateUser);
    router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/users/password', AuthMiddleware, UpdatePassword);
    router.post('/api/send-email', AuthMiddleware, SendEmaill);
}