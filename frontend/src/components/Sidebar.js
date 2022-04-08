import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/reducers/authReducer';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const { adminToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const adminLogout = () => {
      dispatch(logout());
  }

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-30 flex items-center cursor-pointer left-10 top-4"
          fill="#FFFFFF"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 left-0 lg:w-96 md:w-64 sm:text-left bg-gray-700  p-10 pl-10 text-white fixed h-full z-40 ease-in-out duration-500 ${
          showSidebar ? 'translate-x-0 ' : '-translate-x-full'
        }`}
      >
        <ul className="mt-6">
          {adminToken ? (
            <>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-person-circle mr-2 inline-block text-lg"></i>
                <Link to="/dashboard/account" className="text-lg capitalize ">
                  Account
                </Link>
              </li>

              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-receipt-cutoff mr-2 inline-block text-lg"></i>
                <Link to="/dashboard/products" className="text-lg capitalize ">
                  Products
                </Link>
              </li>

              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i>
                <Link
                  to="/dashboard/categories"
                  className="text-lg capitalize "
                >
                  Categories
                </Link>
              </li>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i>
                <Link
                  to="/dashboard/create-product"
                  className="text-lg capitalize "
                >
                  create product
                </Link>
              </li>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i>
                <Link
                  to="/dashboard/create-category"
                  className="text-lg capitalize "
                >
                  create Categories
                </Link>
              </li>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-bar-chart mr-2 inline-block text-lg" ><button className="text-lg capitalize" onClick={adminLogout}>logout</button></i>
               
              </li>
            </>
          ) : (
            <>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-person-circle mr-2 inline-block text-lg"></i>
                <Link to="/auth/admin-login" className="text-lg capitalize ">
                  Sign in
                </Link>
              </li>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-person-circle mr-2 inline-block text-lg"></i>
                <Link to="/auth/register" className="text-lg capitalize ">
                  Register
                </Link>
              </li>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-receipt-cutoff mr-2 inline-block text-lg"></i>
                <Link to="/dashboard/products" className="text-lg capitalize ">
                  Products
                </Link>
              </li>
              <li className="px-4 cursor-pointer py-3 transition-all flex items-center hover:bg-gray-600">
                <i className="bi bi-receipt-cutoff mr-2 inline-block text-lg"></i>
                <Link to="/dashboard/categories" className="text-lg capitalize ">
                  Categories
                </Link>
              </li>
              
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
