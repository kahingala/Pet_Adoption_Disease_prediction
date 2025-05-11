import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
 

// function for add product
const addProduct = async (req,res) => {
    try {
        
        const {name, description, price, category, subCategory, sizes, bestseller}=req.body

        const image1 = req.files.image1 &&req.files.image1[0]
        const image2 = req.files.image2 &&req.files.image2[0]
        const image3 = req.files.image3 &&req.files.image3[0]
        const image4 = req.files.image4 &&req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
            
            
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({success:true,message:"Product Added"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// function for list product
const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }

}

// function for remove product
const removeProduct = async (req,res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// function for single product
const singleProduct = async (req,res) => {
    try {
        
        const{productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// function for update product
const updateProduct = async (req, res) => {
    try {
      const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body;
  
      // Retrieve existing product
      const product = await productModel.findById(id);
      if (!product) return res.json({ success: false, message: 'Product not found' });
  
      // Handle new images if provided
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const newImages = [image1, image2, image3, image4].filter(item => item !== undefined);
  
      let updatedImages = product.image;
  
      if (newImages.length > 0) {
        const uploaded = await Promise.all(
          newImages.map(async (img) => {
            const result = await cloudinary.uploader.upload(img.path, { resource_type: 'image' });
            return result.secure_url;
          })
        );
        updatedImages = uploaded;
      }
  
      // Update fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price ? Number(price) : product.price;
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.bestseller = bestseller === "true" ? true : false;
      product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
      product.image = updatedImages;
      product.date = Date.now();
  
      await product.save();
  
      res.json({ success: true, message: "Product Updated" });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

export {listProducts,addProduct,removeProduct,singleProduct,updateProduct}

