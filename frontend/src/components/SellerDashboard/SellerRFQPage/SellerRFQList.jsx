import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';

const SellerRFQList = ({ data }) => {

    const [requestList, setRequestList] = useState([data.buyer])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setRequestList(data.buyer)
            console.log(data.buyer)
            setLoading(false);
        }
    }, [data])



    const columns = React.useMemo(
        () => [
            {
                Header: 'Full Name',
                accessor: 'fullName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
           
        ],
        []
    );


   




    return (
        <></>
    );
};

export default SellerRFQList;
