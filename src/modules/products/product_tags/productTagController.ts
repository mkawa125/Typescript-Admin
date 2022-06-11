import { checkIfProductTagExistByName, createNewProductTag, deleteProductTagById, getAllProductTags, getProductTagById, updateProductTagById } from './productTagService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { productTagValidation } from './productTagValidation';

export const productTags = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const productTags = await getAllProductTags(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcut tags retireved successfully",
            productTags
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateProductTag = async (req:Request , res:Response) => {
    try {
        const body = req.body;
        const {error} =  productTagValidation.validate(body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        } 
        
        const productTagNameExist = await checkIfProductTagExistByName(body.name);
        if (productTagNameExist) {
            return res.status(409).json({
                userMessage: 'product tag already exist',
                developerMessage: "product tag with similar name already exist in database",
                success: false
            });
        }
       
        /** Continue to create productTag */
        const productTag = await createNewProductTag(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "product tag created successfully",
            data: productTag
        });
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetProductTag = async (req:Request , res:Response) => {
    try {
        const productTag = await getProductTagById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "product tag retrived successfully",
            data: productTag
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateProductTag = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = productTagValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const productTag = await updateProductTagById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "product tag updated successfully",
            data: productTag
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteProductTag =async (req:Request, res:Response) => {
    try {
        const productTag = await deleteProductTagById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "product tag deleted successfully",
            data: productTag
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
                url: `http://localhost/5000/api/productTags/upload/${req.file.filename}`
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