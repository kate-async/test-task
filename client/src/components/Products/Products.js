import React, {useState, useEffect} from 'react';
import Product from './Product/Product'
import './Products.css'

const itemsPerPage = 8;

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3003/api/products?page=${page}&&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                if (products.length + itemsPerPage >= data.totalItems) {
                    setHasMore(false);
                }
                setProducts([...products, ...data.products]);
                setLoading(false);
            });
    }, [page]);

    return (
        <div className='products-wrapper'>
            <div className='grid-wrapper'>
                {products.map((product, i) => <Product key={i} image={product.image} title={product.title} price={product.price}/>)}
            </div>
            {hasMore && <button className='btn-show-more' disabled={loading} onClick={() => setPage(page => page + 1)}>Show More</button>}
        </div>
    );
}

export default Products;

