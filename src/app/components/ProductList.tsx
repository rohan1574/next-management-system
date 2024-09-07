// src/app/components/ProductList.tsx

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ProductList = () => {
  const products = useSelector((state: RootState) => state.inventory.products);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
            >
              <div className="text-lg font-medium text-gray-900">{product.name}</div>
              <div className="text-gray-600">
                Category: <span className="font-semibold text-gray-900">{product.category}</span>
              </div>
              <div className="text-gray-600">
                Quantity: <span className="font-semibold text-gray-900">{product.quantity}</span> in stock
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
