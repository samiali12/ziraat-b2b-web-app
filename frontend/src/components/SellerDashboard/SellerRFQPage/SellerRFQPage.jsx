import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import SellerRFQList from './SellerRFQList'

const SellerRFQPage = ({ userId }) => {

    const [incomingBuyers, setIncomingBuyers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        const getQuoteRequest = async () => {
            
        }
        getQuoteRequest()
    }, [userId])


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Incoming Requests Order Request</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900">
                    <thead className="text-base text-gray-800 uppercase bg-white shadow-md">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {
                        (!isLoading)  ? (
                            <tbody className="mt-2">
                                {
                                    incomingBuyers.buyer.map((buyer) => (
                                        <tr className="bg-white">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                                {buyer.fullName}
                                            </th>
                                          
                                        </tr>
                                    ))
                                }
                            </tbody>
                        ) : (
                            <div className="text-center">
                               {
                                 isLoading ? (
                                    <h1>Loading</h1>
                                 ) : (
                                   <h1> No Request is Available</h1>
                                 )
                               }
                            </div>
                        )
                    }

                </table>
            </div>

        </div>
    )
}

export default SellerRFQPage;