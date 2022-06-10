import { createNewBrand, deleteBrandById, getAllBrands, getBrandById, updateBrandById } from './brandService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { brandValidation } from './brandValidation';

export const Brands = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const products = await getAllBrands(page)
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

export const CreateBrand = async (req:Request , res:Response) => {
    try {
        const body = req.body
        const {error} = brandValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const product = await createNewBrand(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "Brand created successfully",
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

export const GetBrand = async (req:Request , res:Response) => {
    try {
        const product = await getBrandById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Brand retrived successfully",
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

export const UpdateBrand = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = brandValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const product = await updateBrandById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Brand updated successfully",
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

export const DeleteBrand =async (req:Request, res:Response) => {
    try {
        const product = await deleteBrandById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Brand deleted successfully",
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

export const uploadImage = async (req:Request, res:Response) => {
    try {
        const storage = multer.diskStorage({
            destination: './uploads/brands/logo',
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
                url: `http://localhost/5000/api/products/upload/${req.file.filename}`
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