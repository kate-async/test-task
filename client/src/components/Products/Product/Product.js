import React from 'react';
import './Product.css'

function Product({title, image, price}) {
    return (
        <div className='product-wrapper'>
            <div className='image-wrapper'>
                <img src={image} alt='Product photo' />
            </div>
            <h3>{title}</h3>
            <p>{price}</p>
        </div>
    );
}

export default Product;