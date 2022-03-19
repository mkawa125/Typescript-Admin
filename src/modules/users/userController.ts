import { getAllUsers } from './userService';
import { Request, Response } from "express"


export const Users = async (req:Request , res:Response) => {
    
    try {
        const users = await getAllUsers()
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Users retireved successfully",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}