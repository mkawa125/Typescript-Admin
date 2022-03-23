import { getAllPermissions } from './permissionService';
import { Request, Response } from 'express';

export const getPermissions = async (req:Request, res:Response) => {
    try {
        const permissions = await getAllPermissions();
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Permissions retireved successfully",
            data: permissions
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}