import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import useAuthentication from "../../../hooks/auth/useAuthentication";
import Alert from "../../Alert/Alert";
import UpdateProductModal from "../../Modal/UpdateProductModal";
import AddProductModal from "../../Modal/AddProductModal";
import { useTable } from 'react-table';

const SellerProductList = ({ setFlag }) => {

  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [isModalClose, setModalClose] = useState(true)
  const [alert, setAlert] = useState(null);

  const { user, userId } = useAuthentication()
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [productId, setProductId] = useState(null)
  const [updateFlag, setUpdateFlag] = useState(false)

  const showAlert = (type, message) => {
    setAlert({ type, message });

    // Automatically close the alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
      setFlag(null)
    }, 3000);

  };

  const closeAlert = () => {
    setAlert(null);
  };


  // Move to add Product Page
  const onClose = () => {
    setModalClose(!isModalOpen)
    setModalOpen(false)
    getProducts()

  }


  const openProductModal = () => {
    setIsEdit(false)
    setModalOpen(true)
    setModalClose(false)
    setUpdateFlag(false)
  }

  const getProducts = async () => {
    
    if (userId) {

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/seller/${userId}`)
        setProducts(response.data.products)
      }
      catch (error) {

      }

    }
  }

  const updateProduct = async (id) => {
    setProductId(id)
    setIsEdit(true)
    setModalOpen(true)
    setModalClose(false)
    setUpdateFlag(false)
  }

  // Delete a product by id
  const deleteProduct = async (id) => {
    setUpdateFlag(false)
    const response = await axios.delete(`http://localhost:8000/api/v1/products/${id}`)
    setLoading(true)
    if (response.status === 200) {
      setProducts(products.filter(product => product._id !== id));
      showAlert("success", "Product Delete Successully")
      setLoading(false)
      console.log('Product delete Successully')
    }
  };


  useEffect(() => {

    if(updateFlag){ 
      showAlert("success", "Product Update Successully")
    }

    getProducts()
  }, [userId])

  return (
    <div className="container mx-auto px-4 py-8">
      <AddProductModal
        setFlag={setFlag}
        open={isModalOpen}
        onClose={onClose}

      />

      {
        isEdit && <UpdateProductModal
          open={isModalOpen}
          onClose={onClose}
          productId={productId}
          setUpdateFlag={setUpdateFlag}
        />
      }


      <div className="flex items-center justify-between mb-4">

        <h1 className="text-2xl font-bold text-gray-700">Products</h1>
        <div className="mx-auto">
          {alert && <Alert type={alert.type} message={alert.message} onClose={closeAlert} />}
        </div>

        <button
          className="flex items-center bg-[#28844b] hover:bg-[#28844b] px-4 py-2 rounded text-white focus:outline-none"
          onClick={openProductModal}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-white">
                Name
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-white">
                Price
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-white">
                Description
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-3">{product.name}</td>
                <td className="py-2 px-3">{product.price}</td>
                <td className="py-2 px-3">{product.description}</td>
                <td className="py-2 px-3 flex justify-center">
                  <button
                    onClick={() => updateProduct(product._id)}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white focus:outline-none"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <div>
                    {
                      (!loading) ? (

                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="flex items-center bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white focus:outline-none ml-2"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      ) : (

                        <button
                          disabled={true}
                          className="flex items-center bg-red-300 px-2 py-1 rounded text-white focus:outline-none ml-2"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      )
                    }
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProductList;