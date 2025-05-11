import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Update = ({ token }) => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Dog');
  const [subCategory, setsubCategory] = useState('Food');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(backendUrl + '/api/product/single', { productId: id });
        if (response.data.success) {
          const product = response.data.product;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setCategory(product.category);
          setsubCategory(product.subCategory);
          setBestseller(product.bestseller);
          setSizes(product.sizes);
          setExistingImages(product.image);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch product data');
      }
    };
    fetchProduct();
  }, [id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      // Append new images if they exist
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/update', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list'); // Redirect to list page after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload New Images (Leave blank to keep existing)</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                image1
                  ? URL.createObjectURL(image1)
                  : existingImages[0] || assets.upload_area
              }
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={
                image2
                  ? URL.createObjectURL(image2)
                  : existingImages[1] || assets.upload_area
              }
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={
                image3
                  ? URL.createObjectURL(image3)
                  : existingImages[2] || assets.upload_area
              }
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={
                image4
                  ? URL.createObjectURL(image4)
                  : existingImages[3] || assets.upload_area
              }
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setsubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Food">Food</option>
            <option value="Medicine">Medicine</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('1kg')
                  ? prev.filter((item) => item !== '1kg')
                  : [...prev, '1kg']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('1kg') ? 'text-black' : 'text-black'
              }`}
              style={{
                backgroundColor: sizes.includes('1kg') ? '#d4c49e' : '#e2e8f0',
              }}
            >
              1kg
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('5kg')
                  ? prev.filter((item) => item !== '5kg')
                  : [...prev, '5kg']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('5kg') ? 'text-black' : 'text-black'
              }`}
              style={{
                backgroundColor: sizes.includes('5kg') ? '#d4c49e' : '#e2e8f0',
              }}
            >
              5kg
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('12kg')
                  ? prev.filter((item) => item !== '12kg')
                  : [...prev, '12kg']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('12kg') ? 'text-black' : 'text-black'
              }`}
              style={{
                backgroundColor: sizes.includes('12kg') ? '#d4c49e' : '#e2e8f0',
              }}
            >
              12kg
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        UPDATE
      </button>
    </form>
  );
};

export default Update;