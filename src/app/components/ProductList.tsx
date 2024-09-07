import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateProduct, deleteProduct } from '../features/inventorySlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.inventory.products);

  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<{
    name: string;
    category: string;
    quantity: number;
  } | null>(null);

  const handleEditClick = (product: Product) => {
    setEditProductId(product.id);
    setEditedProduct({
      name: product.name,
      category: product.category,
      quantity: product.quantity
    });
  };

  const handleSaveClick = () => {
    if (editedProduct) {
      dispatch(updateProduct({ id: editProductId!, ...editedProduct }));
      toast.info('Product updated successfully!');
      setEditProductId(null);
      setEditedProduct(null);
    }
  };

  const handleCancelClick = () => {
    setEditProductId(null);
    setEditedProduct(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'name' | 'category' | 'quantity'
  ) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: field === 'quantity' ? parseInt(e.target.value, 10) : e.target.value
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              dispatch(deleteProduct(id));
              toast.dismiss(toastId);
              toast.success('Product deleted successfully!');
            }}
            className="text-red-500 hover:underline"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Category</th>
                <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                <th className="py-2 px-4 text-left text-gray-600">Activity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-900">
                    {editProductId === product.id ? (
                      <input
                        type="text"
                        value={editedProduct?.name || ''}
                        onChange={(e) => handleChange(e, 'name')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {editProductId === product.id ? (
                      <input
                        type="text"
                        value={editedProduct?.category || ''}
                        onChange={(e) => handleChange(e, 'category')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      product.category
                    )}
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {editProductId === product.id ? (
                      <input
                        type="number"
                        value={editedProduct?.quantity || 0}
                        onChange={(e) => handleChange(e, 'quantity')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editProductId === product.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveClick}
                          className="text-green-500 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="text-red-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductList;
