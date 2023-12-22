import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BiImage } from 'react-icons/bi'
import { addNewProduct } from '../../features/productCRUDFeatures/productCRUDSlice';

import useAuthentication from '../../hooks/auth/useAuthentication';
import Alert from '../Alert/Alert';


const UpdateProductModal = ({ open, onClose, productId, setUpdateFlag }) => {

    const [product, setProduct] = useState({
        seller: null,
        name: "",
        price: "",
        description: "",
        images: [],
        category: "",
        stock: 0,
    });

    let { isLoading, isSuccess, isError, products } = useSelector(state => state.product)


    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [imageFiles, setImageFiles] = useState([])
    const [previewImageFiles, setPreviewImageFiles] = useState([])
    const [alert, setAlert] = useState(null);

    const { authenticated, userId } = useAuthentication();

    const showAlert = (type, message) => {
        setAlert({ type, message });

    };

    const closeAlert = () => {
        setAlert(null);
    };


    // A function that handles the input change event
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(product)
        setProduct((prev) => ({ ...prev, [name]: value }));

        setErrorMessage(null)
        setSuccessMessage(null)
    };

    const handleCategoryChange = (e) => {
        setProduct({
            ...product,
            category: e.target.value,
        });

        setErrorMessage(null)
        setSuccessMessage(null)


    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setPreviewImageFiles([])
        setImageFiles([])

        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPreviewImageFiles(
                        (old) => [
                            ...old,
                            reader.result
                        ]
                    )
                    setImageFiles(
                        (old) => [
                            ...old,
                            reader.result
                        ]
                    )
                }
            }
            reader.readAsDataURL(file);
        })

        setErrorMessage(null)
        setSuccessMessage(null)


    };

    // A function that handles the form submit event
    const handleSubmit = async (e) => {
        onClose()
        console.log(userId)
        e.preventDefault();
        if (userId !== null) {
            product.images = imageFiles
            product.seller = userId
            try {
                const response = await axios.put(`http://localhost:8000/api/v1/products/${productId}`, product)
                if (response.status === 200) {
                    setProduct(response.data.product)
                    console.log("Product is update successfully")
                }
            } catch (error) {

            }
        }

    };

    useEffect(() => {


        const getProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/products/${productId}`)
                if (response.data.success) {
                    setProduct(response.data.product)

                }
            } catch (error) {

            }
        }

        if (isSuccess && !(isLoading === false)) {
            setUpdateFlag('success')
            onClose()
        }

        if (isError) {
            setUpdateFlag('error')
            onClose()
        }

        getProduct()
    }, [isSuccess, isLoading, isError, products])


    return (

        (open) ? (


            <div className="fixed inset-0 z-10 flex items-center justify-center overflow-scroll">

                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40 "
                    onClick={onClose} // Close the modal when the backdrop is clicked
                ></div>
                <form
                    className="relative w-full max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg  "
                    onSubmit={handleSubmit} // Call the handleSubmit function when the form is submitted
                >

                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">



                        <h3 className="text-2xl font-semibold">Edit Product</h3>
                        <button
                            className="absolute top-10 right-10 mt-2 mr-2 p-2rounded-full text-gray-700 hover:bg-gray-300 focus:outline-none"
                            onClick={onClose}
                        >
                            X
                        </button>
                    </div>

                    <div className="relative p-6 flex-auto">

                        <div className="grid grid-cols-2 gap-4">

                            <div className="flex items-center col-span-2 shadow appearance-none border rounded py-2 px-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Select Image of Product
                                </label>
                                <input
                                    className=" text-gray-700 leading-tight w-full focus:outline-none focus:shadow-outline"
                                    type="file"
                                    accept='image/*'
                                    name="images" // Use the name attribute to identify the field
                                    onChange={handleImagesChange} // Call the handleChange function when the input value changes
                                    required // Make the field required
                                    multiple
                                />
                            </div>


                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>

                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Price
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="name" // Use the name attribute to identify the field
                                value={product.name} // Use the product state variable to store the field value
                                onChange={handleChange} // Call the handleChange function when the input value changes
                                required // Make the field required
                            />

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                name="price" // Use the name attribute to identify the field
                                value={product.price} // Use the product state variable to store the field value
                                onChange={handleChange} // Call the handleChange function when the input value changes
                                required // Make the field required
                            />

                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Stock
                            </label>

                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Category
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                name="stock" // Use the name attribute to identify the field
                                value={product.stock} // Use the product state variable to store the field value
                                onChange={handleChange} // Call the handleChange function when the input value changes
                                required // Make the field required
                            />

                            <select
                                name="category"
                                value={product.category}
                                onChange={handleCategoryChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                <option value="">Select a category</option>
                                <option value="Rice">Rice</option>
                                <option value="Sugarcane">Sugarcane</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Wheat">Wheat</option>
                            </select>



                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 col-span-2"
                            >
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-2"
                                name="description" // Use the name attribute to identify the field
                                value={product.description} // Use the product state variable to store the field value
                                onChange={handleChange} // Call the handleChange function when the input value changes
                                required // Make the field required
                            ></textarea>

                        </div>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">

                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={onClose} // Call the onClose prop function when the button is clicked
                        >
                            Cancel
                        </button>
                        <div>
                            <button
                                className={`
              ${isLoading ? 'hidden' : ''}
              bg-[#28844b] text-white active:bg-[#28844b] 
              font-bold uppercase text-sm px-6 py-3 rounded shadow 
              hover:shadow-lg outline-none focus:outline-none
               mr-1 mb-1 ease-linear transition-all duration-150`}
                                type="submit" // Set the button type to submit
                            >
                                Update Product
                            </button>
                            <button
                                disabled={isLoading ? true : false}
                                className={`
              ${isLoading ? '' : 'hidden'}
              bg-[#28844b] text-white active:bg-[#28844b] 
              font-bold uppercase text-sm px-6 py-3 rounded shadow 
              hover:shadow-lg outline-none focus:outline-none
               mr-1 mb-1 ease-linear transition-all duration-150`}
                            // Set the button type to submit
                            >
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        ) : (
            <div></div>
        )
    )
}

export default UpdateProductModal;