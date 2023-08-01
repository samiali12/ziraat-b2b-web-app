import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerified = () => {


    const { token } = useParams()
    const [validUrl, setValidUrl] = useState(false)
    const navigate = useNavigate()

    useEffect( () => {

        const verifyEmail = async () => {
            try {

                console.log(token)
                const url = `http://localhost:8000/api/v1/user/verify-email/${token}`

                await axios.post(url)

                setValidUrl(true)

                console.log("Email Verified Successfuly")

            } catch (err) {
                setValidUrl(false)
                console.log("Email Not Verified Successfuly")
            }
        }


        if(setValidUrl){
            navigate("/login")
        }

        verifyEmail()

    }, [token])

    return (

        <Fragment>

            {
                validUrl ?

                    (
                        <div className="flex items-center justify-center min-h-screen bg-gray-100">
                            <div className="bg-white w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className="text-2xl font-bold mb-4">Email Verified Successfully</h2>
                                <p className="text-green-600 mb-4">
                                    Please wait we redirecting you on login page
                                </p>

                            </div>
                        </div>
                    ) : (

                        <div>

                        </div>
                    )
            }
        </Fragment>

    );
};

export default EmailVerified;