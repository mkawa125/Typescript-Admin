import { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } from './userService';
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

export const CreateUser = async (req:Request , res:Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "User created successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetUser = async (req:Request , res:Response) => {
    try {
        const user = await getUserById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "User retrived successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateUser = async (req:Request, res:Response) => {
    try {
        const user = await updateUserById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "User updated successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteUser =async (req:Request, res:Response) => {
    try {
        const user = await deleteUserById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "User deleted successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}