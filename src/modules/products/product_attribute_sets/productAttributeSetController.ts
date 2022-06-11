import { checkIfProductAttributeSetExistByName, createNewProductAttributeSet, deleteProductAttributeSetById, getAllProductAttributeSets, getProductAttributeSetById, updateProductAttributeSetById } from './productAttributeSetService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { productAttributeSetValidation } from './productAttributeSetValidation';

export const productAttributeSets = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const data = await getAllProductAttributeSets(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcut attribute sets retireved successfully",
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

export const CreateProductAttributeSet = async (req:Request , res:Response) => {
    try {
        const body = req.body;
        const {error} =  productAttributeSetValidation.validate(body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        } 
        
        const productAttributeSetsNameExist = await checkIfProductAttributeSetExistByName(body.title);
        if (productAttributeSetsNameExist) {
            return res.status(409).json({
                userMessage: 'product attribute set already exist',
                developerMessage: "Product attribute set with similar name already exist in database",
                success: false
            });
        }
       
        /** Continue to create productAttributeSets */
        const data = await createNewProductAttributeSet(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "product attribute set created successfully",
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetProductAttributeSet = async (req:Request , res:Response) => {
    try {
        const data = await getProductAttributeSetById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Product attribute set retrived successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateProductAttributeSet = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = productAttributeSetValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const productAttributeSet = await updateProductAttributeSetById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Product attribute set updated successfully",
            data: productAttributeSet
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteProductAttributeSet =async (req:Request, res:Response) => {
    try {
        const data = await deleteProductAttributeSetById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Product attribute set deleted successfully",
            data: data
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
            destination: './uploads/product_attribute_sets',
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