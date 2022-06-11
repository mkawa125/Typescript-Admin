import { checkIfProductCollectionExistByName, createNewProductCollection, deleteProductCollectionById, getAllProductCollections, getProductCollectionById, updateProductCollectionById } from './productCollectionService';
import { Request, Response } from "express"
import multer from 'multer';
import { extname } from 'path';
import { productCollectionValidation } from './productCollectionValidation';

export const productCollections = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const productCollections = await getAllProductCollections(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Prodcut collections retireved successfully",
            productCollections
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const CreateProductCollection = async (req:Request , res:Response) => {
    try {
        const body = req.body;
        const {error} =  productCollectionValidation.validate(body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        } 
        
        const productCollectionsNameExist = await checkIfProductCollectionExistByName(body.name);
        if (productCollectionsNameExist) {
            return res.status(409).json({
                userMessage: 'product collection already exist',
                developerMessage: "Product collection with similar name already exist in database",
                success: false
            });
        }
       
        /** Continue to create productCollections */
        const productCollections = await createNewProductCollection(req.body);
        return res.status(201).json({
            userMessage: 'Success',
            developerMessage: "product collection created successfully",
            data: productCollections
        });
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const GetProductCollection = async (req:Request , res:Response) => {
    try {
        const productCollections = await getProductCollectionById(req.params.id)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Product collection retrived successfully",
            data: productCollections
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const UpdateProductCollection = async (req:Request, res:Response) => {
    try {
        const body = req.body
        const {error} = productCollectionValidation.validate(body);

        if (error) { return res.status(400).send({ success: false, message: error.details })}

        const productCollections = await updateProductCollectionById(req.params.id, req.body)
        return res.status(202).json({
            userMessage: 'Success',
            developerMessage: "Product collection updated successfully",
            data: productCollections
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const DeleteProductCollection =async (req:Request, res:Response) => {
    try {
        const productCollections = await deleteProductCollectionById(req.params.id)
        return res.status(204).json({
            userMessage: 'Success',
            developerMessage: "Product collection deleted successfully",
            data: productCollections
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
                url: `http://localhost/5000/api/productCollections/upload/${req.file.filename}`
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