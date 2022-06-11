import { checkIfProductLabelExistByName, createNewProductLabel, deleteProductLabelById, getAllProductLabels, getProductLabelById, updateProductLabelById } from './productLabelService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { productLabelValidation } from './productLabelValidation';

export const productLabels = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const productLabelss = await getAllProductLabels(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcut labels retireved successfully",
            productLabelss
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateproductLabel = async (req:Request , res:Response) => {
    try {
        const body = req.body;
        const {error} =  productLabelValidation.validate(body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        } 
        
        const productLabelsNameExist = await checkIfProductLabelExistByName(body.name);
        if (productLabelsNameExist) {
            return res.status(409).json({
                userMessage: 'product label already exist',
                developerMessage: "product label with similar name already exist in database",
                success: false
            });
        }
       
        /** Continue to create productLabels */
        const productLabels = await createNewProductLabel(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "product label created successfully",
            data: productLabels
        });
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetproductLabel = async (req:Request , res:Response) => {
    try {
        const productLabels = await getProductLabelById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "product label retrived successfully",
            data: productLabels
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateproductLabel = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = productLabelValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const productLabels = await updateProductLabelById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "product label updated successfully",
            data: productLabels
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteproductLabel =async (req:Request, res:Response) => {
    try {
        const productLabels = await deleteProductLabelById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "product label deleted successfully",
            data: productLabels
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const uploadImage = async (req:Request, res:Response) => {
    try {
        const storage = multer.diskStorage({
            destination: './uploads/product_abels',
            filename(req:Request, file:Express.Multer.File, callback){
                const randomName =  Math.random().toString(20).substr(2, 12);
                return callback(null, `${randomName}${extname(file.originalname)}`)
    
            }
        })

        const upload = multer({storage}).single('image');
        upload(req, res, (error) => {
            if (error) {
                return res.status(500).json({
                    userMessage: 'Something went wrong, contact the system admin',
                    developerMessage: error,
                    success: false
                });
            }
            return res.status(201).json({
                userMessage: 'Success',
                developerMessage: "Image uploaded successfully",
                url: `http://localhost/5000/api/productLabelss/upload/${req.file.filename}`
            })
        })
        
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}