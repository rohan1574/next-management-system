"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashoard from '../app/components/Dashoard';
import AddProductForm from '../app/components/AddProductForm';
import ProductList from '../app/components/ProductList';
import Notification from '../app/components/Notification';
import BarChart from '../app/components/BarChart';
import PieChart from '../app/components/PieChart';
import LineChart from '../app/components/LineChart';
import { notifyLowStock } from '../app/utils/notificationUtils';
import { RootState } from './store/store';
// import { RootState } from '../app/store'; // Adjust this import based on your store setup

const Home = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.inventory.products); // Adjust based on your state structure

  useEffect(() => {
    notifyLowStock(dispatch);
  }, [dispatch]);

  const toggleAddProductForm = () => {
    setShowAddProductForm(prev => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management System</h1>
      
      <Dashoard onToggleForm={toggleAddProductForm} productCount={products.length} />
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Conditionally render AddProductForm */}
        {showAddProductForm && (
          <div className="w-full md:w-1/3">
            <AddProductForm onClose={() => setShowAddProductForm(false)} />
          </div>
        )}

        {/* ProductList component */}
        <div className="w-full md:w-2/3">
          <ProductList />
        </div>
      </div>

      <Notification />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Product Charts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BarChart />
          <PieChart />
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
