import { checkIfProductAttributeExistByName, createNewProductAttribute, deleteProductAttributeById, getAllProductAttributes, getProductAttributeById, updateProductAttributeById } from './productAttributeService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { productAttributeValidation } from './productAttributeValidation';

export const productAttributes = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const data = await getAllProductAttributes(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcut attributes retireved successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateProductAttribute = async (req:Request , res:Response) => {
    try {
        const body = req.body;
        const {error} =  productAttributeValidation.validate(body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        } 
        
        const productAttributesNameExist = await checkIfProductAttributeExistByName(body.title);
        if (productAttributesNameExist) {
            return res.status(409).json({
                userMessage: 'product attribute already exist',
                developerMessage: "Product attribute with similar title already exist in database",
                success: false
            });
        }
       
        /** Continue to create productAttributes */
        const productAttributes = await createNewProductAttribute(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "product attribute created successfully",
            data: productAttributes
        });
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetProductAttribute = async (req:Request , res:Response) => {
    try {
        const productAttributes = await getProductAttributeById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Product attribute retrived successfully",
            data: productAttributes
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateProductAttribute = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = productAttributeValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const productAttribute = await updateProductAttributeById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Product attribute updated successfully",
            data: productAttribute
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteProductAttribute =async (req:Request, res:Response) => {
    try {
        const productAttributes = await deleteProductAttributeById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Product attribute deleted successfully",
            data: productAttributes
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
                url: `http://localhost/5000/api/productAttributes/upload/${req.file.filename}`
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