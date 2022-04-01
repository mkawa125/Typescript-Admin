import { User } from './../entity/user.entity';
import { Request, Response } from "express"
import { getManager } from "typeorm";
import { verify } from "jsonwebtoken";

export const AuthMiddleware = async (req:Request, res:Response, next: Function) => {

    try {
        const jwt = req.cookies['jwt'];
        const payload: any = verify(jwt, process.env.SECRET_KEY);
        if (!payload) {
            return res.status(401).send({
                message: "Unauthenticated",
            });
        }
        const repository = getManager().getRepository(User);
        const user =  await repository.findOne(payload.id, {relations: ['role', 'role.permissions']});

        req["user"] = user;

        next();

    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated",
            developerMessage: error.message
        });
    }
}