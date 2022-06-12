import { getAllCustomers, createCustomer, getCustomerById, updateCustomerById, deleteCustomerById } from './customerService';
import { Request, Response } from "express"


export const Customers = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const customers = await getAllCustomers(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Customers retireved successfully",
            data: customers
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateCustomer = async (req:Request , res:Response) => {
    try {
        const customer = await createCustomer(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "Customer created successfully",
            data: customer
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetCustomer = async (req:Request , res:Response) => {
    try {
        const customer = await getCustomerById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Customer retrived successfully",
            data: customer
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateCustomer = async (req:Request, res:Response) => {
    try {
        const customer = await updateCustomerById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Customer updated successfully",
            data: customer
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteCustomer =async (req:Request, res:Response) => {
    try {
        const customer = await deleteCustomerById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Customer deleted successfully",
            data: customer
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}