import { createNewProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from './productService';
import { Request, Response } from "express"

export const Products = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const products = await getAllProducts(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcuts retireved successfully",
            products
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateProduct = async (req:Request , res:Response) => {
    try {
        const product = await createNewProduct(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "Product created successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetProduct = async (req:Request , res:Response) => {
    try {
        const product = await getProductById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Product retrived successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateProduct = async (req:Request, res:Response) => {
    try {
        const product = await updateProductById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Product updated successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteProduct =async (req:Request, res:Response) => {
    try {
        const product = await deleteProductById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Product deleted successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}