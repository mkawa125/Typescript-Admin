import { getAllRoles, createNewRole, getRoleById } from './roleService';
import { Request, Response } from 'express';

export const getRoles = async (req:Request, res:Response) => {
    try {
        const permissions = await getAllRoles();
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Roles retireved successfully",
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

export const createRole = async (req:Request, res:Response) => {
    try {
        const role = await createNewRole(req.body);
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Roles created successfully",
            data: role
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const getRole = async (req: Request , res:Response) => {
    try {
        const role = await getRoleById(req.params.id);
        if (!role) {
            return res.status(200).json({
                userMessage: 'Role not found',
                developerMessage: "Role with such ID not found in database",
            })
        }
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Role retrieved successfully",
            data: role
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}