import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products = [] } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        console.log('Products:', products); // Debug: Check what products look like
        
        if (products.length > 0) {
            // More flexible filtering
            const bestProducts = products.filter(item => 
                item.bestSeller === true || 
                item.bestSeller === 'true' ||
                item.isBestSeller === true ||
                item.bestseller === true
            );
            
            console.log('Filtered Best Sellers:', bestProducts); // Debug: Check filtered results
            
            setBestSeller(bestProducts.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Best'} text2={'SELLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover Our Best Sellers – Tried, Tested, and Loved by Pets Everywhere! 🐾✨
                    Shop our top-rated pet essentials, from cozy beds to nutritious treats, and
                    give your furry friend the very best!
                </p>
            </div>

            {bestSeller.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {bestSeller.map((item, index) => (
                        <ProductItem
                            key={item._id || index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-500'>
                    No Best Sellers Available. Check console for debugging information.
                </p>
            )}
        </div>
    );
};

export default BestSeller;