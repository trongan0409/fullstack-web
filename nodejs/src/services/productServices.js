import { raw } from "body-parser";
import db from "../models/";

let handleCreateServices = (productInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Product.findOne({
                where: { nameProduct: productInput.nameProduct }
            });
            if (check) {
                resolve({
                    errCode: 2,
                    errMessage: 'This product already exists!'
                })
            } else {
                await db.Product.create({
                    nameProduct: productInput.nameProduct,
                    categoryType: productInput.categoryType,
                    price: productInput.price,
                    quantity: productInput.quantity,
                    slug: productInput.slug,
                    detail: productInput.detail,
                    status: productInput.status,
                    image: productInput.image,
                });
                resolve({
                    errCode: 0,
                    errMessage: `Created succeed!`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetAllProducts = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (productId === 'ALL') {
                let allProducts = await db.Product.findAll();
                resolve({
                    errCode: 0,
                    errMessage: `Get all products succeed!`,
                    data: allProducts
                })
            } else {
                let product = await db.Product.findOne({
                    where: { id: productId }
                });
                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: `Product isn't exist!`,
                        data: []
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: `Get product succeed!`,
                        data: product
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteProduct = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: idInput,
                },
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: `This product isn't exist!`
                })
            } else {
                await product.destroy();
                resolve({
                    errCode: 0,
                    errMessage: `Deleted successfully!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

let handleEditUser = (product) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundProduct = await db.Product.findOne({
                where: { id: product.id },
                raw: false
            })
            if (!foundProduct) {
                resolve({
                    errCode: 2,
                    errMessage: `This product isn't exist!`
                })
            } else {
                foundProduct.nameProduct = product.nameProduct,
                    foundProduct.categoryType = product.categoryType,
                    foundProduct.price = product.price,
                    foundProduct.quantity = product.quantity,
                    foundProduct.slug = product.slug,
                    foundProduct.detail = product.detail,
                    foundProduct.status = product.status,
                    foundProduct.image = product.image
                await foundProduct.save();
                resolve({
                    errCode: 0,
                    errMessage: `Updated successfully!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

let handleGetRecommendProduct = (product) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await db.Product.findOne({
                where: { id: product.id }
            })
            if (!checkProduct) {
                resolve({
                    errCode: 2,
                    errMessage: `This product isn't exist!`
                })
            }
            let products = await db.Product.findAll({
                where: { categoryType: product.categoryType }
            });
            resolve({
                errCode: 0,
                errMessage: `Get recommend product succeed!`,
                data: products
            })
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetProductByType = (productType) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProducts = await db.Product.findAll({
                where: { categoryType: productType.type }
            });
            if (!allProducts) {
                resolve({
                    errCode: 2,
                    errMessage: `This type isn't exist!`,
                    data: []
                })
            }
            resolve({
                errCode: 0,
                errMessage: `Get products by type succeed!`,
                data: allProducts
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleCreateServices: handleCreateServices,
    handleGetAllProducts: handleGetAllProducts,
    handleDeleteProduct: handleDeleteProduct,
    handleEditUser: handleEditUser,
    handleGetRecommendProduct: handleGetRecommendProduct,
    handleGetProductByType: handleGetProductByType
}