import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, setCartItems, getCartCount,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const tempData = [];
    const tempInputValues = {};
    
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
          tempInputValues[`${itemId}-${size}`] = cartItems[itemId][size];
        }
      }
    }
    setCartData(tempData);
    setInputValues(tempInputValues);
  }, [cartItems]);

  useEffect(() => {
    getCartCount(); 
  }, [cartItems]);

  const removeItem = (itemId, size) => {
    const updatedCart = { ...cartItems };
    
    if (updatedCart[itemId]) {
      delete updatedCart[itemId][size];
      
      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }
    }
    
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (e, itemId, size) => {
    const value = e.target.value;
    const key = `${itemId}-${size}`;
    
    setInputValues(prev => ({
      ...prev,
      [key]: value
    }));
    
    const numericValue = parseInt(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      updateQuantity(itemId, size, numericValue);
    }
  };

  const handleBlur = (itemId, size) => {
    const key = `${itemId}-${size}`;
    const value = inputValues[key];
    
    if (!value || isNaN(parseInt(value)) || parseInt(value) < 1) {
      setInputValues(prev => ({
        ...prev,
        [key]: cartItems[itemId]?.[size] || 1
      }));
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          const inputKey = `${item._id}-${item.size}`;
          
          return (
            <div key={index} className="py-4 border-b text-gray-700 flex items-center gap-3">
              {/* Product Image */}
              <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />

              {/* Product Info */}
              <div className="text-sm sm:text-base flex flex-col gap-2">
                <p className="font-medium">{productData.name}</p>
                <p className="text-gray-500">{currency}{productData.price}</p>
                <p className="text-gray-500">Size: {item.size}</p>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) => handleQuantityChange(e, item._id, item.size)}
                onBlur={() => handleBlur(item._id, item.size)}
                className="border max-w-12 sm:max-w-16 px-2 py-1 text-center mx-auto"
                type="number"
                min="1"
                value={inputValues[inputKey] || ''}
              />
              
              {/* Delete Button */}
              <img
                className="w-4 sm:w-5 cursor-pointer ml-auto"
                onClick={() => removeItem(item._id, item.size)}
                src={assets.bin_icon}
                alt="Delete Item"
              />
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
