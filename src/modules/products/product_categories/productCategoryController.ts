import { checkIfProductCategoryExistByName, createNewProductCategory, deleteProductCategoryById, getAllProductCategories, getProductCategoryById, updateProductCategoryById } from './productCategoryService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { productCategoryValidation } from './productCategoryValidation';

export const productCategories = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const productCategories = await getAllProductCategories(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcut categories retireved successfully",
            productCategories
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateProductCategory = async (req:Request , res:Response) => {
    try {
        const body = req.body;
        const {error} =  productCategoryValidation.validate(body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        } 
        
        const productCategorysNameExist = await checkIfProductCategoryExistByName(body.name);
        if (productCategorysNameExist) {
            return res.status(409).json({
                userMessage: 'product category already exist',
                developerMessage: "Product category with similar name already exist in database",
                success: false
            });
        }
       
        /** Continue to create productCategorys */
        const productCategorys = await createNewProductCategory(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "product category created successfully",
            data: productCategorys
        });
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetProductCategory = async (req:Request , res:Response) => {
    try {
        const productCategorys = await getProductCategoryById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Product category retrived successfully",
            data: productCategorys
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateProductCategory = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = productCategoryValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const productCategory = await updateProductCategoryById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Product category updated successfully",
            data: productCategory
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteProductCategory =async (req:Request, res:Response) => {
    try {
        const productCategories = await deleteProductCategoryById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Product category deleted successfully",
            data: productCategories
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
            destination: './uploads/product_categories',
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
                url: `http://localhost/5000/api/productCategories/upload/${req.file.filename}`
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